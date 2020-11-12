import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { ExceptionST } from '../../st/ExceptionST';
//import { Symbol } from '../../st/Symbol';
import { types } from 'src/st/Type';
import { ContinueNode } from '../Expresiones/ContinueNode';
import { BreakNode } from '../Expresiones/BreakNode';
import { TypeError, typesError } from '../../st/TypeError';
import { Intermedio } from '../../st/Intermedio';
import { Result } from '../..//st/Result';


export class CaseNode extends Node {

  value:Node;
  caseInst: Array<Node>;

  constructor(caseList: Array<Node>,line: Number,column: Number, value?:Node){
    super(null, line, column);
    this.value= value;
    this.caseInst= caseList;
  }

  genCode(table: Table, tree: Tree, intermedio:Intermedio) {

    console.log("logramos el case node , value ->" + this.value);

    return "";
  }


  execute(table:Table, tree:Tree){

    return "";

  }
}
