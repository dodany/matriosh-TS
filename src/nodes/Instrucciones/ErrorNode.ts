import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { types, Type } from '../../st/Type';
import { ExceptionST } from '../../st/ExceptionST';

export class ErrorNode extends Node {
  err: ExceptionST;

  constructor(err: ExceptionST, line: Number, column: Number) {
    super(new Type(types.VOID), line, column);
    this.err = err;
  }

  execute(table: Table, tree: Tree): any {
    tree.excepciones.push(this.err);
    return null;
  }

}
