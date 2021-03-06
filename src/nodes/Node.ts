import { Type } from '../st/Type';
import { Table } from '../st/Table';
import { Tree } from '../st/Tree';
import { Intermedio } from '../st/Intermedio';

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

  /***
   *
   * @abstract Método abstracto para generar el Codigo de 3 direcciones
   */
  abstract genCode(table: Table, tree: Tree, intermedio: Intermedio): any;
}
