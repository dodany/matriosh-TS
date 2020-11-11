
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

export class SwhitchNode extends Node{

  value:Node;
  caseList:Array<Node>;


  constructor( value:Node, caseList:Array<Node>, line: Number,column: Number ){
    super(null, line,column);
    this.value=value;
    this.caseList= caseList;
  }

  genCode( table:Table, tree:Tree, intermedio:Intermedio){

    console.log("logramos el swithch , value ->" + this.value);

    return "";
  }

  execute(table:Table, tree:Tree){

  }

}
