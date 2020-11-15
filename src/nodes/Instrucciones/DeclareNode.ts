import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { types, Type } from '../../st/Type';
import { ExceptionST } from '../../st/ExceptionST';
import { Symbol } from '../../st/Symbol';
import { TypeError, typesError } from '../../st/TypeError';
import { Intermedio } from '../../st/Intermedio';
import { Result } from '../../st/Result';

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

    let cadena = result.cadena;
    let var_: Symbol;
    var_ = table.getVariable(intermedio.getAmbito(),this.id);

    if (var_ == null) {
      //NO EXISTE

      // Valor del Stack_pointer
      let sp = intermedio.setSP();
      let symbol: Symbol;
      let temporal = intermedio.newTemporal();

      if (this.value.type == null) {
        //***************************** */ TEMPORAL de ArithNode
        if (this.type.type === types.NUMBER) {

          symbol = new Symbol(intermedio.getAmbito(), this.type,this.id,result.valor,this.const_,[],sp,1);
          cadena = intermedio.StackpointerC3D(temporal, cadena, sp, result.valor,this.id, "Declare ");
        } else {
        }
      } else {

        //COMPROBACIÓN DE LOS TIPOS
        if ( this.type.type != this.value.type.type ){
            console.log ("Fucking error ");
            //ERROR NO COINCIDE EL TIPO
            //Error
        const error = new ExceptionST(typesError.SEMANTICO, "Error de tipo en la asignación " + this.id + ' ' + ',','[' + this.line + ',' + this.column + ']');
        tree.excepciones.push(error);

        }
        else{

            //console.log ("Nel");

             //*********** */ ASIGNACIÓN de ValueNode
              if (this.value.type.type === types.NUMBER) {
                //NÚMERO
                  symbol = new Symbol(intermedio.getAmbito(),this.type,this.id,result.valor,this.const_,[],sp, 1);
                  cadena = intermedio.StackpointerC3D(temporal, cadena, sp, result.valor,this.id, "Declare ");

              } else if (this.value.type.type === types.STRING) {
                //CADENA
                let hp = intermedio.setHP();
                //VERIFICO SI NO INGRESAN VALOR
                  symbol = new Symbol(intermedio.getAmbito(),this.type,this.id,result.valor,this.const_,[],hp, 1);
                cadena = intermedio.StackpointerC3D(temporal, cadena, sp, temporal,this.id, "Declare ");
                  intermedio.setHp_memory ( result.valor.length);

                  cadena = intermedio.HeapPointerC3D(  temporal, cadena, hp, result.valor);

              } else if ( this.type.type === types.BOOLEAN) {
                //BOOLEAN
                let b= result.valor == 'true';
                symbol= new Symbol (intermedio.getAmbito(), result.type, this.id, Number(b), this.const_,[], sp,1);
              cadena = intermedio.StackpointerC3D(temporal, cadena, sp, Number(b).toString(),this.id, "Declare ");
              }

               //INSERTAR en la tabla de simbolos
      const res = table.setVariable(symbol);
      // verificar
      if (res == null) {
        //Error
        const error = new ExceptionST(typesError.SEMANTICO, res + ',','[' + this.line + ',' + this.column + ']');
        tree.excepciones.push(error);
      } else {
        tree.console.push(cadena);
        return new Result(temporal, this.type, cadena);
      }

      }//FIN DONDE NO HAY ERROR DE TIPO

      }

    } else {
      // YA EXISTE el id
      const error = new ExceptionST(typesError.SEMANTICO,"ID existe "+ this.id+ + ',', '[' + this.line + ',' + this.column + ']');
      tree.excepciones.push(error);
      return ""; //CUIDADO CON ESTE RETURN ?
    }
  }



  //*************EXECUTE
  execute(table: Table, tree: Tree) {
    const result = this.value.execute(table, tree);
    if (result instanceof ExceptionST) {
      return result;
    }
    let symbol: Symbol;
    //symbol = new Symbol(this.type, this.id, result, this.const_);
   /* const res = table.setVariable(symbol);
    if (res != null) {
      const error = new ExceptionST(
        typesError.SEMANTICO,
        res + ',',
        '[' + this.line + ',' + this.column + ']'
      );
      tree.excepciones.push(error);
    }*/
    return null;
  }
}
