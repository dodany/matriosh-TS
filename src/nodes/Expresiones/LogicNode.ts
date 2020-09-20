import { Node } from '../Node';
import { types, Type } from '../../st/Type';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { Exception } from '../../st/Exception';

export class LogicNode extends Node {
  arg1: Node;
  arg2: Node;
  op: String;

  constructor(
    arg1: Node,
    arg2: Node,
    op: String,
    line: Number,
    column: Number
  ) {
    super(new Type(types.BOOLEAN), line, column);
    this.arg1 = arg2;
    this.arg2 = arg2;
    this.op = op;
  }

  execute(table: Table, tree: Tree) {
    const lResult = this.arg1.execute(table, tree);
    if (lResult instanceof Exception) {
      return lResult;
    }
    const rResult = this.arg2.execute(table, tree);
    if (rResult instanceof Exception) {
      return rResult;
    }

    if (
      this.arg1.type.type === types.BOOLEAN &&
      this.arg2.type.type === types.BOOLEAN
    ) {
      switch (this.op) {
        case '&&':
          return lResult && rResult;
        case '||':
          return lResult || rResult;
        default:
          const error = new Exception(
            'Semantico',
            `Error 1 de tipos que esta tratando de operar ${this.arg1.type.type} y ${this.arg2.type.type}`,
            this.line,
            this.column
          );
          tree.excepciones.push(error);
          tree.console.push(error.toString());
          return error;
      }
    } else {
      const error = new Exception(
        'Semantico',
        `Error 2 de tipos que esta tratando de operar ${this.arg1.type.type} y ${this.arg2.type.type}`,
        this.line,
        this.column
      );
      tree.excepciones.push(error);
      tree.console.push(error.toString());
      return error;
    }
  }
}
