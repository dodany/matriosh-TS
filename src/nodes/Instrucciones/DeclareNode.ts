import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { types, Type } from 'src/st/Type';
import { ExceptionST } from '../../st/ExceptionST';
import { Symbol } from '../../st/Symbol';

export class DeclareNode extends Node {
  type: Type;
  id: String;
  value: Node;

  constructor(
    type: Type,
    id: String,
    value: Node,
    line: Number,
    column: Number
  ) {
    super(type, line, column);
    this.type = type;
    this.id = id;
    this.value = value;
  }

  execute(table: Table, tree: Tree) {
    const result = this.value.execute(table, tree);
    if (result instanceof ExceptionST) {
      return result;
    }

    if (this.type.type != this.value.type.type) {
      const error = new ExceptionST(
        'Semantico',
        `No se puede declarar la variable porque los tipos no coinciden.`,
        this.line,
        this.column
      );
      tree.excepciones.push(error);
      tree.console.push(error.toString());
      return error;
    }

    let symbol: Symbol;
    symbol = new Symbol(this.type, this.id, result);
    const res = table.setVariable(symbol);
    if (res != null) {
      const error = new ExceptionST('Semantico', res, this.line, this.column);
      tree.excepciones.push(error);
      tree.console.push(error.toString());
    }
    return null;
  }
}
