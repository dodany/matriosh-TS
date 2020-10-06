import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { ExceptionST } from '../../st/ExceptionST';
import { types } from 'src/st/Type';
import { ContinueNode } from '../Expresiones/ContinueNode';
import { BreakNode } from '../Expresiones/BreakNode';
import { TypeError, typesError } from '../../st/TypeError';

export class WhileNode extends Node {
  condition: Node;
  list: Array<Node>;

  constructor(condition: Node,list: Array<Node>,line: Number,column: Number ) {
    super(null, line, column);
    this.condition = condition;
    this.list = list;
  }

  execute(table: Table, tree: Tree) {
    const newTable = new Table(table);
    let result: Node;


    do {
      result = this.condition.execute(newTable, tree);
      console.log( this.condition);
      if (result instanceof ExceptionST) {
        return result;
      }

      if (this.condition.type.type !== types.BOOLEAN) {

        const error = new ExceptionST(  typesError.SEMANTICO,
          `Debe ser una expresion booleana para la condición`  + ",",
           "[" + this.line +"," + this.column + "]");

        tree.excepciones.push(error);
        return null;
      }

      console.log("llegosdfsdf acá");
      console.log(result);

      if (result) {
        for (let i = 0; i < this.list.length; i++) {

          const res = this.list[i].execute(newTable, tree);
          if (res instanceof ContinueNode) {
            break;
          } else if (res instanceof BreakNode) {
            return;
          }
        }
      }
    } while (result);

    return null;
  }
}
