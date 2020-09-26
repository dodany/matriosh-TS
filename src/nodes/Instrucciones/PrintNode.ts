import { Node } from  '../Node';
import { Table } from '../../st/Table';
import { Tree } from  '../../st/Tree';
import { types,Type } from 'src/st/Type';

export class PrintNode extends Node {

  exp: Node;

  constructor( exp: Node, line: Number, column: Number ){
    super ( new Type(types.VOID), line,column);
    this.exp = exp;
  }

  execute ( table:Table, tree:Tree) {

    let var_: String;

    return var_;
  }
}
