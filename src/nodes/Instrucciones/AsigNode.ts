import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { ExceptionST } from '../../st/ExceptionST';
import { Symbol } from '../../st/Symbol';
import { TypeError, typesError } from '../../st/TypeError';
import { Intermedio } from '../../st/Intermedio';
import { Result } from '../../st/Result';
import { ArithNode } from '../Expresiones/ArithNode';
import { ValueNode } from '../Expresiones/ValueNode';
import { types, Type } from '../../st/Type';


export class AsigNode extends Node {
  id: String;
  value: Node;

  constructor(id: String, value: Node, line: Number, column: Number) {
    super(null, line, column);
    this.id = id;
    this.value = value;
  }


  genCode(table: Table, tree: Tree, intermedio: Intermedio) {

    // me falta lo del constante

    const result = this.value.genCode(table,tree,intermedio);
    let cadena:String="";

    let var_: Symbol;
    var_ = table.getVariable(intermedio.getAmbito() ,this.id);

    if (var_ == null) {
      const error = new ExceptionST(typesError.SEMANTICO,'No se ha encontrado la variable ' + this.id + ',','[' + this.line + ',' + this.column + ']');
      tree.excepciones.push(error);
      return "";
    } else {
    //SI SE ENCONTRÓ LA VARIABLE

    if ( this.value instanceof ValueNode){
        //VIENE DEL VALUENode
         //EL TIPO
      if (this.value.type.type == types.NUMBER) {
         //NUMERO
        //symbol = new Symbol(intermedio.getAmbito(),this.type,this.id,result.valor,this.const_,[],sp, 1);
        let temporal= intermedio.newTemporal();
        cadena = intermedio.StackpointerC3D(temporal, cadena, var_.position,  this.value.value.toString(), this.id, "Asigna value ");

        tree.console.push(cadena);
      }

    }
    else  if ( this.value instanceof ArithNode){

     // console.log(this.value.type );
     // console.log(this.value.type.type );
      //console.log(result.types.type );
       //***************************** */ TEMPORAL de ArithNode


       console.log(this.value);
       if (this.value.type.type === types.NUMBER) {
        let temporal= intermedio.newTemporal();
        cadena = intermedio.StackpointerC3D(temporal, result.cadena, var_.position, result.valor,this.id, "Declare ");

        tree.console.push(cadena);
       }



    }

    }

    return "";
  }


  //*****************EXECUTE
  execute(table: Table, tree: Tree) {
    console.log("Asignode ->");
    const result = this.value.execute(table, tree);
    if (result instanceof ExceptionST) {
      return result;
    }
    let var_: Symbol;
    //var_ = table.getVariable(this.id);
    if (var_ == null) {
      const error = new ExceptionST(
        typesError.SEMANTICO,
        'No se ha encontrado la variable ' + this.id + ',',
        '[' + this.line + ',' + this.column + ']'
      );

      tree.excepciones.push(error);
      return null;
    } else {
      if (var_.const_) {
        const error = new ExceptionST(
          typesError.SEMANTICO,
          this.id + ' -> es constante no se puede modificar',
          '[' + this.line + ',' + this.column + ']'
        );
        tree.excepciones.push(error);
        return null;
      } else if (this.value.type.type != var_.type.type) {
        const error = new ExceptionST(
          typesError.SEMANTICO,
          `No se puede asignar la variable porque los tipos no coinciden.` +
            ',',
          '[' + this.line + ',' + this.column + ']'
        );
        tree.excepciones.push(error);
        return null;
      }
    }
    var_.value = result;
  }
}
