import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { Symbol } from '../../st/Symbol';
import { ExceptionST } from '../../st/ExceptionST';
import { TypeError, typesError } from '../../st/TypeError';
import { ContinueNode } from '../Expresiones/ContinueNode';
import { BreakNode } from '../Expresiones/BreakNode';
import { Intermedio } from '../../st/Intermedio';
import { Result } from '../..//st/Result';


export class TypesNode extends Node {

  id:String;
  param:Array<Node>

  constructor( id:String, param:Array<Node>, line: number, column: number) {
    super(null, line, column);
    this.id=id;
    this.param=param;
  }

  genCode(table: Table, tree: Tree, intermedio: Intermedio) {

    console.log("Types");
    return "";
  }

  execute(table: Table, tree: Tree) {
    return "";
  }


}
