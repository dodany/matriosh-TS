import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { Symbol } from '../../st/Symbol';
import { ExceptionST } from '../../st/ExceptionST';
import { TypeError, typesError } from '../../st/TypeError';
import { ContinueNode } from '../Expresiones/ContinueNode';
import { BreakNode } from '../Expresiones/BreakNode';

export class CallNode extends Node {
  id: String;

  constructor(id: String, line: Number, column: Number) {
    super(null, line, column);
    this.id= id;

  }

  genCode(table: Table, tree: Tree) {

    return "";
  }


  execute(table: Table, tree: Tree) {
    let var_: Symbol;
    const newTable = new Table(table);
    var_ = table.getVariable(this.id);

    if (var_ == null) {
      const error = new ExceptionST(
        typesError.SEMANTICO,
        'No se ha encontrado la función ' + this.id + ',',
        '[' + this.line + ',' + this.column + ']'
      );

      tree.excepciones.push(error);
      return null;
    } else {
      if (var_.instList == null) {
        const error = new ExceptionST(
          typesError.SEMANTICO,
          'No existen instrucciones en la función ' + this.id + ',',
          '[' + this.line + ',' + this.column + ']'
        );
        tree.excepciones.push(error);
        return null;
      } else {
        //EJECUTAR
        for (let i = 0; i < var_.instList.length; i++) {
          const res = var_.instList[i].execute(newTable, tree);
          if (res instanceof ContinueNode || res instanceof BreakNode) {
            return res;
          }
        }

      }
    }

    return null;
  }
}
