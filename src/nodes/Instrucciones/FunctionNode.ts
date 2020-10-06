import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { Symbol } from '../../st/Symbol';
import { ContinueNode } from '../Expresiones/ContinueNode';
import { BreakNode } from '../Expresiones/BreakNode';
import { types, Type } from 'src/st/Type';
import { ExceptionST } from '../../st/ExceptionST';
import { TypeError, typesError } from '../../st/TypeError';

export class FunctionNode extends Node {
  type: Type;
  id: String;
  instList: Array<Node>;

  constructor(
    type: Type,
    id: String,
    instList: Array<Node>,
    line: Number,
    column: Number
  ) {
    super(type, line, column);
    this.type = type;
    this.id = id;
    this.instList = instList;
  }

  execute(table: Table, tree: Tree) {
    let symbol: Symbol;
    const newTable = new Table(table);

    symbol = new Symbol(this.type, this.id, null, true, this.instList);

    const res = table.setVariable(symbol);
    if (res != null) {
      const error = new ExceptionST(
        typesError.SEMANTICO,
        res + ',',
        '[' + this.line + ',' + this.column + ']'
      );
      tree.excepciones.push(error);
    }
    for (let i = 0; i < this.instList.length; i++) {
      const res = this.instList[i].execute(newTable, tree);

      if (res instanceof ContinueNode || res instanceof BreakNode) {
        return res;
      }
    }

    return null;
  }
}
