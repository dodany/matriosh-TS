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

export class ForInOfNode extends Node {

  id:String;
  in_:Node;
  arg1:Node;

  constructor(id:String, in_:Node, arg1:Node,  line: number, column: number) {
    super(null, line, column);
    this.id=id;
    this.in_=in_;
    this.arg1=arg1;
  }


  genCode(table: Table, tree: Tree, intermedio: Intermedio) {
    console.log("logramos for in of");
    return "";
  }

  execute(table: Table, tree: Tree) {
    return "";
  }




}
