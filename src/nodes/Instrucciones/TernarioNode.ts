import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { Symbol } from '../../st/Symbol';
import { ExceptionST } from '../../st/ExceptionST';
import { TypeError, typesError } from '../../st/TypeError';


export class TernarioNode extends Node {
  condition: Node;
  arg1: Node;
  arg2: Node;

  constructor(condition: Node, arg1: Node, arg2: Node, line: Number, column: Number) {
    super(null, line, column);
    this.condition = condition;
    this.arg1 = arg1;
    this.arg2 = arg2;
  }

  execute(table: Table,tree: Tree, ) {
    const newTable = new Table(table);
    let result: Node;
    result = this.condition.execute(newTable, tree);

    const arg1_ = this.arg1.execute(table, tree);
    const arg2_ = this.arg2.execute(table, tree);

    if (result) {
      return arg1_;
    } else {
      return arg2_;
    }

    return null;
  }
}
