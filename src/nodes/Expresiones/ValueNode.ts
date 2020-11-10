import { Node  } from '../Node';
import { Type  } from '../../st/Type';
import { Table } from '../../st/Table';
import { Tree  } from '../../st/Tree';
import { Result } from '../..//st/Result';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';

export class ValueNode extends Node {
  value: Object;


  constructor(type: Type, value: Object, line: Number, column: Number) {
    super(type, line, column);
    this.value = value;
  }

/**
 * C3D
 */
  genCode(table: Table, tree: Tree) {
    return new Result( this.value.toString(), this.type , "");
  }

  execute( table: Table, tree: Tree) {
    return this.value;
  }
}
