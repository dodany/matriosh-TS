import { Node } from '../Node';
import { Table } from 'src/st/Table';
import { Tree } from 'src/st/Tree';
import { Symbol } from '../../st/Symbol';
import { ExceptionST } from '../../st/ExceptionST';
import { TypeError,typesError } from '../../st/TypeError';

export class IdNode extends Node {
  id: String;

  constructor(id: String, line: Number, column: Number) {
    // tipo null porque aun no se el tipo
    super(null, line, column);
    this.id = id;
  }

  execute(table: Table, tree: Tree) {
    let var_: Symbol;

    var_ = table.getVariable(this.id);
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
