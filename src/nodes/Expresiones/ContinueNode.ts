import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';

export class ContinueNode extends Node {
  constructor(line: Number, column: Number) {
    super(null, line, column);
  }

  genCode(table: Table, tree: Tree) {

    return "";
  }

  execute(table: Table, tree: Tree) {
    return this;
  }
}
