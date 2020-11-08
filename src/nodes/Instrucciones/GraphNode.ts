import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { types, Type } from 'src/st/Type';
import { Symbol } from '../../st/Symbol';
import { CdkTableModule } from '@angular/cdk/table';

export class GraphNode extends Node {
  constructor(line: Number, column: Number) {
    super(new Type(types.VOID), line, column);
  }


  genCode(table: Table, tree: Tree) {

    return "";
  }



  execute(table: Table, tree: Tree) {

/*
    let var_: Symbol;

    for ( let value:Symbol of table.Variables){
      tree.pila.push (value);
    }
*/
    tree.pila = Array.from(table.Variables.values());


  }
}
