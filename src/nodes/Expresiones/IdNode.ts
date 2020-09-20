import { Node } from '../Node';
import { Table } from 'src/st/Table';
import { Tree } from 'src/st/Tree';
import { Symbol } from '../../st/Symbol';
import { Exception } from '../../st/Exception';

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
      const error = new Exception(
        'Semantico',
        'No se ha encontrado la variable ' + this.id,
        this.line,
        this.column
      );
      tree.excepciones.push(error);
      tree.console.push(error.toString());
      return error;
    }
    this.type = var_.type;
    return var_.value;
  }
}
