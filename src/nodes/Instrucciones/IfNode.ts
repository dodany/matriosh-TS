import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { ExceptionST } from '../../st/ExceptionST';
import { Symbol } from '../../st/Symbol';
import { types } from 'src/st/Type';
import { ContinueNode } from '../Expresiones/ContinueNode';
import { BreakNode } from '../Expresiones/BreakNode';
import { TypeError, typesError } from '../../st/TypeError';

export class IfNode extends Node {
  condition: Node;
  ifList: Array<Node>;
  elseList: Array<Node>;

  constructor(
    condition: Node,
    ifList: Array<Node>,
    elseList: Array<Node>,
    line: Number,
    column: Number
  ) {
    super(null, line, column);
    this.condition = condition;
    this.ifList = ifList;
    this.elseList = elseList;
  }

  execute(table: Table, tree: Tree) {
    const newTable = new Table(table);
    let result: Node;
    result = this.condition.execute(newTable, tree);
    if (result instanceof ExceptionST) {
      return result;
    }

    if (this.condition.type.type !== types.BOOLEAN) {

      const error = new ExceptionST(  typesError.SEMANTICO,
        `Se esperaba una expresion booleana para la condicion`  + ",",
         "[" + this.line +"," + this.column + "]");

      tree.excepciones.push(error);

      return error;
    }

    if (result) {
      for (let i = 0; i < this.ifList.length; i++) {
        const res = this.ifList[i].execute(newTable, tree);
        if (res instanceof ContinueNode || res instanceof BreakNode) {
          return res;
        }
      }
    } else {
      for (let i = 0; i < this.elseList.length; i++) {
        const res = this.elseList[i].execute(newTable, tree);
        if (res instanceof ContinueNode || res instanceof BreakNode) {
          return res;
        }
      }
    }

    return null;
  }
}
