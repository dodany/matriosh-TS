import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { ExceptionST } from '../../st/ExceptionST';
import { Symbol } from '../../st/Symbol';
import { TypeError, typesError } from '../../st/TypeError';

export class AsigNode extends Node {
  id: String;
  value: Node;

  constructor(id: String, value: Node, line: Number, column: Number) {
    super(null, line, column);
    this.id = id;
    this.value = value;
  }

  execute(table: Table, tree: Tree) {
    const result = this.value.execute(table, tree);
    if (result instanceof ExceptionST) {
      return result;
    }

    let var_: Symbol;
    var_: table.getVariable(this.id);

    if (var_ == null) {

      const error = new ExceptionST(  typesError.SEMANTICO,
        'No se ha encontrado la variable ' + this.id +",",
        "[" + this.line +"," + this.column + "]");

      tree.excepciones.push(error);
      return error;
    }

    if (this.value.type.type != var_.type.type) {

      const error = new ExceptionST(  typesError.SEMANTICO,
        `No se puede asignar la variable porque los tipos no coinciden.` +",",
        "[" + this.line +"," + this.column + "]");
      tree.excepciones.push(error);
      return error;
    }

    var_.value = result;
  }
}
