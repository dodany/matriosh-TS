import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';

export class ContinueNode extends Node {
  constructor(line: Number, column: Number) {
    super(null, line, column);
  }

  execute(table: Table, tree: Tree) {
    return this;
  }
}
