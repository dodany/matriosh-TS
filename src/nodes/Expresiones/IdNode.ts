import { Node } from '../Node';
import { Table } from 'src/st/Table';
import { Tree } from 'src/st/Tree';
import { Symbol } from '../../st/Symbol';
import { ExceptionST } from '../../st/ExceptionST';
import { Intermedio } from '../../st/Intermedio';
import { TypeError,typesError } from '../../st/TypeError';
import { Result } from '../../st/Result';

export class IdNode extends Node {
  id: String;

  constructor(id: String, line: Number, column: Number) {
    // tipo null porque aun no se el tipo
    super(null, line, column);
    this.id = id;
  }

  genCode(table: Table, tree: Tree, intermedio: Intermedio) {
    // RETORNAR EL VALOR

    let var_: Symbol;
    var_ = table.getVariable(intermedio.getAmbito(),this.id);
    if ( var_== null){
      //NO EXISTE ESE ID
      const error = new ExceptionST(  typesError.SEMANTICO,'No se ha encontrado la variable ' + this.id  +",", "[" + this.line +"," + this.column + "]");
      tree.excepciones.push(error);
      return error;
    }else {

      let cadena:String="";

      let temporal= intermedio.newTemporal();
      cadena = intermedio.getStackPointerC3D (temporal, cadena, var_.position, temporal, this.id, "IdNode- valor");

      console.log("Idnode");
      console.log(cadena);

      return new Result(temporal, var_.type ,cadena);
      //return cadena;

    }

    //return cadena;
  }




  //***EXECUTE */
  execute(table: Table, tree: Tree) {
    let var_: Symbol;

    //var_ = table.getVariable(this.id);
    if (var_ == null) {

      const error = new ExceptionST(  typesError.SEMANTICO,
        'No se ha encontrado la variable ' + this.id  +",",
        "[" + this.line +"," + this.column + "]");
      tree.excepciones.push(error);
      return error;

    }
    this.type = var_.type;
    return var_.value;
  }
}
