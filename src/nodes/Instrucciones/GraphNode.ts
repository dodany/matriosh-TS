import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { types, Type } from 'src/st/Type';

export class GraphNode extends Node {
  constructor(line: Number, column: Number) {
    super(new Type(types.VOID), line, column);
  }

  execute(table: Table, tree: Tree) {

    let var_: String;

    return var_;
  }
}
