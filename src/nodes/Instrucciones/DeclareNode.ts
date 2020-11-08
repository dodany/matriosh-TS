import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { types, Type } from '../../st/Type';
import { ExceptionST } from '../../st/ExceptionST';
import { Symbol } from '../../st/Symbol';
import { TypeError, typesError } from '../../st/TypeError';
import { Intermedio } from '../../st/Intermedio';

export class DeclareNode extends Node {
  type: Type;
  id: String;
  value: Node;
  const_: Boolean;

  constructor( type: Type, id: String, value: Node, line: Number, column: Number, const_:Boolean) {
    super(type, line, column);
    this.type = type;
    this.id = id;
    this.value = value;
    this.const_= const_;
  }

  genCode(table: Table, tree: Tree, intermedio:Intermedio) {
    const result = this.value.genCode(table, tree, intermedio);

    console.log("DeclareNode ->" + result.cadena);


    let symbol: Symbol;
    symbol = new Symbol(this.type, this.id, 0, this.const_,[],1,1);

    const res = table.setVariable(symbol);

    if (res != null) {
      //ERROR
      return "";
    }

    return null;
  }

  execute(table: Table, tree: Tree) {
    const result = this.value.execute(table, tree);
    if (result instanceof ExceptionST) {
      return result;
    }

    let symbol: Symbol;
    symbol = new Symbol(this.type, this.id, result, this.const_);

    const res = table.setVariable(symbol);
    if (res != null) {

      const error = new ExceptionST(  typesError.SEMANTICO,
       res  + ",",
        "[" + this.line +"," + this.column + "]");
      tree.excepciones.push(error);

    }
    return null;
  }
}
