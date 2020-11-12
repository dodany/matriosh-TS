import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { types, Type } from '../../st/Type';
import { ExceptionST } from '../../st/ExceptionST';
import { Symbol } from '../../st/Symbol';
import { TypeError, typesError } from '../../st/TypeError';
import { Intermedio } from '../../st/Intermedio';
import { Result } from '../..//st/Result';


export class ParamNode extends Node {

  type: Type;
  id: String;

  constructor( type: Type, id: String, line: Number, column: Number) {
    super(type, line, column);
    this.type = type;
    this.id = id;
  }

  genCode (table:Table, tree:Tree, intemedio:Intermedio){
    return new Result( this.id.toString(), this.type , "");
  }

  execute(table: Table, tree: Tree) {
    return "";
  }

}
