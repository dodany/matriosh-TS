import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { types, Type } from '../../st/Type';
import { ExceptionST } from '../../st/ExceptionST';
import { Symbol } from '../../st/Symbol';
import { TypeError, typesError } from '../../st/TypeError';
import { Intermedio } from '../../st/Intermedio';
import { Result } from '../..//st/Result';

export class DeclareArrayNode extends Node {

  type: Type;
  id: String;
  value: Array<Node>;
  const_: Boolean;

  constructor(type: Type, id: String, value: Array<Node>, line: Number, column: Number, const_: Boolean ) {
    super(type, line, column);
    this.type = type;
    this.id = id;
    this.value = value;
    this.const_ = const_;
  }

  genCode(table: Table, tree: Tree, intermedio: Intermedio) {

  //const result = this.value.genCode(table, tree, intermedio);

    for (let i = 0; i < this.value.length; i++) {
      console.log (" gencode value  -> " + this.value[i].genCode(table, tree, intermedio).valor);

    }

      return "";
  }

  execute(table: Table, tree: Tree) {

    return "";
  }
}
