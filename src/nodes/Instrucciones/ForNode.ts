import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { Symbol } from '../../st/Symbol';
import { ExceptionST } from '../../st/ExceptionST';
import { TypeError, typesError } from '../../st/TypeError';
import { ContinueNode } from '../Expresiones/ContinueNode';
import { BreakNode } from '../Expresiones/BreakNode';


export class ForNode extends Node {


  //FOR: 'for' '('  DECLARACION ';' CONDICION ';' EXP ')' '{' BLOQUE_INSTRUCCIONES '}'
  id: String;
  value:Node;
  condition: Node;
  third_condition: Node;
  statement: Array<Node>;

  constructor(id:String, value:Node, condition:Node, third_condition:Node, statement:Array<Node>,line: number, column: number) {
    super(null, line, column);
    this.id= id;
    this.value= value;
    this.condition= condition;
    this.third_condition= third_condition;
    this.statement= statement;
    console.log("construcor for ");
  }

  execute(table: Table, tree: Tree) {

    const newTable = new Table(table);
    let result: Node;

    console.log ("Hoy si entro al ForNode ");


    return result;

  }
}
