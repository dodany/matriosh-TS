import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { types, Type } from 'src/st/Type';

export class GraphNode extends Node {
  constructor(line: Number, column: Number) {
    super(new Type(types.VOID), line, column);
  }

  genCode(table: Table, tree: Tree) {
    tree.pila = Array.from(table.Variables.values());
  }

  execute(table: Table, tree: Tree) {
    tree.pila = Array.from(table.Variables.values());
  }
}
