import { Node  } from '../Node';
import { Type  } from '../../st/Type';
import { Table } from '../../st/Table';
import { Tree  } from '../../st/Tree';

export class ValueNode extends Node {
  value: Object;

  constructor(type: Type, value: Object, line: Number, column: Number) {
    super(type, line, column);
    this.value = value;
  }

  execute( table: Table, tree: Tree) {
    return this.value;
  }
}
