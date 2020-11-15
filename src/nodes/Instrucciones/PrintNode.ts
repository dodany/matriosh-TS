import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { types, Type } from 'src/st/Type';
import { Intermedio } from '../../st/Intermedio';
import { IdNode } from '../Expresiones/IdNode';

export class PrintNode extends Node {
  //arg1: Node;

  arg: Array<Node>;

  constructor(arg: Array<Node>, line: Number, column: Number) {
    super(new Type(types.VOID), line, column);
    this.arg = arg;
  }

  genCode(table: Table, tree: Tree, intermedio: Intermedio) {
    //CALCULAR EL TAMAÑO DE LAS VARIABLES
    for (let i = 0; i < this.arg.length; i++) {
    const res = this.arg[i].genCode(table, tree, intermedio);
    console.log("console--log");
    console.log ( res);

   let a= res.cadena;
   let b:String = res.valor;
   let c =b.substring(1);

   let print= '\n' + 'printf("%f",' + 'T'+(Number(c)+1)+');';
   print+= '\n'+'printf("\\n");';

   tree.console.push(a+ print +'\n');

  }

    return '';
  }

  execute(table: Table, tree: Tree): any {
    // const value = this.arg1.execute(table, tree);
    // tree.console.push(value);
    return null;
  }
}
