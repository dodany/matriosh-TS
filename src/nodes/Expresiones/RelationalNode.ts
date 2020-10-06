import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { types, Type } from '../../st/Type';
import { ExceptionST } from '../../st/ExceptionST';
import { TypeError, typesError } from '../../st/TypeError';

export class RelationalNode extends Node {
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
    this.type = new Type(types.BOOLEAN);
    const lResult = this.arg1.execute(table, tree);
    if (lResult instanceof ExceptionST) {
      return lResult;
    }
    const rResult = this.arg2.execute(table, tree);
    if (rResult instanceof ExceptionST) {
      return rResult;
    }

    if (
      this.arg1.type.type === types.NUMBER &&
      this.arg2.type.type === types.NUMBER
    ) {
      switch (this.op) {
        case '<':
          return lResult < rResult;
        case '>':
          return lResult > rResult;
        case '>=':
          return lResult >= rResult;
        case '<=':
          return lResult <= rResult;
        case '==':
          return lResult === rResult;
        case '!=':
          return lResult != rResult;
        default:

          const error = new ExceptionST(  typesError.SEMANTICO,
            'Operador desconocido'+"," ,
            "[" + this.line +"," + this.column + "]");
          tree.excepciones.push(error);
          return error;
      }
    } else {

      const error = new ExceptionST(  typesError.SEMANTICO,
        `Problema con los tipos que esta tratando de operar ${this.arg1.type.type} y ${this.arg2.type.type}`+",",
        "[" + this.line +"," + this.column + "]");
      tree.excepciones.push(error);
      return error;
    }
  }
}
