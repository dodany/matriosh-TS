import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { types, Type } from '../../st/Type';
import { ExceptionST } from '../../st/ExceptionST';
import { Symbol } from '../../st/Symbol';
import { TypeError, typesError } from '../../st/TypeError';
import { Intermedio } from '../../st/Intermedio';
import { Result } from '../..//st/Result';
import { cachedDataVersionTag } from 'v8';

export class DeclareNode extends Node {
  type: Type;
  id: String;
  value: Node;
  const_: Boolean;

  constructor(type: Type, id: String, value: Node, line: Number, column: Number, const_: Boolean ) {
    super(type, line, column);
    this.type = type;
    this.id = id;
    this.value = value;
    this.const_ = const_;
  }

  genCode(table: Table, tree: Tree, intermedio: Intermedio) {
    const result = this.value.genCode(table, tree, intermedio);

    console.log('DeclareNode value ->' + this.value.type);
    console.log('DeclareNode type ->' + this.type);
    console.log('result.cadena  cadena ->' + result.cadena);
    console.log('result.valor valor->' + result.valor);
    console.log('result.types  types->' + result.types);

    //PRIMERO VERIFICAR LA VARIABLE
    let var_: Symbol;
    var_ = table.getVariable(this.id);
    if (var_ == null) {
      //NO EXISTE

      // Valor del Stack_pointer
      let sp = intermedio.setSP();
      let symbol: Symbol;
      let temporal = intermedio.newTemporal();
      let cadena = result.cadena;

      if (this.value.type == null) {
        //***************************** */ TEMPORAL de ArithNode
        if (this.type.type === types.NUMBER) {
          symbol = new Symbol(result.type,this.id,result.valor,this.const_,[],sp,1);
          cadena = this.StackpointerC3D(temporal, cadena, sp, result.valor);
        } else {
          //LOS OTROS VALORES
        }
      } else {
        //*********** */ ASIGNACIÓN de ValueNode
        if (this.value.type.type === types.NUMBER) {
          //NÚMERO
          symbol = new Symbol(this.type,this.id,result.valor,this.const_,[],sp, 1);
          cadena = this.StackpointerC3D(temporal, cadena, sp, result.valor);

        } else if (this.value.type.type === types.STRING) {
          //CADENA
          let hp = intermedio.setHP();
          symbol = new Symbol(this.type,this.id,result.valor,this.const_,[],hp, 1);
          cadena = this.StackpointerC3D(temporal, cadena, sp, result.valor);

          console.log ( "heap actual antes -> " + intermedio.getHP() );

          intermedio.setHp_memory ( result.valor.length -1);
          // heap
          cadena = this.HeapPointerC3D(  temporal, cadena, hp, result.valor);
          // VERIFICAR SI ES NULL
          console.log ( "heap actual después -> " + intermedio.getHP() );

        }
      }

      //INSERTAR

      const res = table.setVariable(symbol);
      // verificar
      if (res == null) {
        //Error
        const error = new ExceptionST(typesError.SEMANTICO, res + ',','[' + this.line + ',' + this.column + ']');
        tree.excepciones.push(error);
      } else {

        cadena = this.StackpointerC3D(temporal, cadena, sp, result.valor);

        tree.console.push(cadena);
        return new Result(temporal, this.type, cadena);
      }




    } else {
      // YA EXISTE el id

    }
  }

  private add_ts() {}

  private StackpointerC3D(temporal: String, cadena: String, sp: Number, result: String ): String {
    cadena += temporal + ' = ' + 'p' + ' + ' + sp;
    cadena += ';\n';
    cadena += '//' + 'Declare id ' + this.id + '\n';
    cadena += 'stack[(int)' + temporal + '] = ' + result;
    cadena += ';\n';
    cadena += '//' + 'Stack value ' + result;
    cadena += ';\n';
    return cadena;
  }

  private HeapPointerC3D(temporal:String, cadena:String, hp: Number, result:String): String {

    for ( let i=0; i<result.length ; i++){

      cadena += 'heap[(int)h] = ' + result.charCodeAt(i);
      cadena += ';\n';

      cadena += 'h = h + 1';
      cadena += ';\n';
    }

      cadena+= ' heap[(int)h] = -1';
      cadena += ';\n';

    return cadena;
  }

  execute(table: Table, tree: Tree) {
    const result = this.value.execute(table, tree);
    if (result instanceof ExceptionST) {
      return result;
    }

    let symbol: Symbol;
    symbol = new Symbol(this.type, this.id, result, this.const_);

    const res = table.setVariable(symbol);
    if (res != null) {
      const error = new ExceptionST(
        typesError.SEMANTICO,
        res + ',',
        '[' + this.line + ',' + this.column + ']'
      );
      tree.excepciones.push(error);
    }
    return null;
  }
}
