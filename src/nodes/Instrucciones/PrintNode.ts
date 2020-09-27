import { Node } from  '../Node';
import { Table } from '../../st/Table';
import { Tree } from  '../../st/Tree';
import { types,Type } from 'src/st/Type';

export class PrintNode extends Node {
  arg1: Node;

  constructor( arg1: Node, line: Number, column: Number ){
    super ( new Type(types.VOID), line,column);
    this.arg1 = arg1;
  }

 execute(table: Table, tree: Tree): any {
        const value = this.arg1.execute(table, tree);
        console.log ( "execute print " +value);
        tree.console.push(value);
        return null;
    }
}
