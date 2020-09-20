import { Type  } from '../st/Type';
import { Table } from '../st/Table';
import { Tree  } from '../st/Tree';

export abstract class Node {
  line: Number;
  column: Number;
  type: Type;

  constructor(type: Type, line: Number, column: Number) {
    this.type = type;
    this.line = line;
    this.column = column;
  }

  /***
   *
   * @abstract Método abstracto para ejectuar una instrucción
   */
  abstract execute(table: Table, tree: Tree): any;

}
