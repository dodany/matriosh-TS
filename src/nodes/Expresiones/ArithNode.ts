import { Node } from '../Node';
import { ExceptionST } from '../../st/ExceptionST';
import { types, Type } from '../../st/Type';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { TypeError, typesError } from '../../st/TypeError';

export class ArithNode extends Node {
  arg1: Node;
  arg2: Node;
  op: String;

  constructor(
    arg1: Node,
    arg2: Node,
    op: String,
    line: Number,
    column: Number
  ) {
    super(null, line, column);
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.op = op;
  }

  execute(table: Table, tree: Tree) {
    const lResult = this.arg1.execute(table, tree);
    if (lResult instanceof ExceptionST) {
      return lResult;
    }

    if (this.arg2 !== null) {
      //VIENEN AMBOS NODOS
      const rResult = this.arg2.execute(table, tree);
      if (rResult instanceof ExceptionST) {
        return rResult;
      }

      if (
        this.arg1.type.type === types.NUMBER &&
        this.arg2.type.type === types.NUMBER
      ) {
        this.type = new Type(types.NUMBER);
        switch (this.op) {
          case '+':
            return lResult + rResult;
            break;
          case '-':
            return lResult - rResult;
            break;
          case '*':
            return lResult * rResult;
            break;
          case '/':
            if (rResult === 0) {
              const error = new ExceptionST(
                typesError.SEMANTICO,
                `La division con cero no esta permitida`,
                this.line,
                this.column
              );
              tree.excepciones.push(error);
              tree.console.push(error.toString());
              return error;
            } else {
              return lResult / rResult;
            }
            break;
          case '%':
            return lResult % rResult;
            break;
          case '**':
            return lResult ** rResult;
            break;
          default:
            const error = new ExceptionST(
              typesError.SEMANTICO,
              'Operador desconocido.',
              this.line,
              this.column
            );
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
            break;
        }
      } else if (
        this.arg1.type.type === types.STRING &&
        this.arg2.type.type === types.STRING
      ) {
        this.type = new Type(types.STRING);
        switch (this.op) {
          case '+':
            return lResult + rResult;
            break;
          default:
            const error = new ExceptionST(
              typesError.SEMANTICO,
              'Operador desconocido.',
              this.line,
              this.column
            );
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
            break;
        }
      } else if (
        this.arg1.type.type === types.ARRAY &&
        this.arg2.type.type === types.ARRAY
      ) {
        //ARRAYS

        return null;
      } else {
        const error = new ExceptionST(
          typesError.SEMANTICO,
          `No se pueden operar  ${this.arg1.type.type} y ${this.arg2.type.type}`,
          this.line,
          this.column
        );
        tree.excepciones.push(error);
        tree.console.push(error.toString());
        return error;
      }
    } else {
      // SOLO VIENE EL NODO IZQUIERDO

      if (this.arg1.type.type === types.NUMBER) {
        this.type = new Type(types.NUMBER);
        switch (this.op) {
          case '++':
            return lResult + 1;
            break;
          case '--':
            return lResult - 1;
            break;
          case '-':
            return lResult * -1;
            break;
          default:
            const error = new ExceptionST(
              typesError.SEMANTICO,
              'Operador desconocido.',
              this.line,
              this.column
            );
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
            break;
        }
      } else {
        //NO ES NUMBER
        const error = new ExceptionST(
          typesError.SEMANTICO,
          `Un operando aritmético debe ser de tipo number'. ${this.arg1.type.type}`,
          this.line,
          this.column
        );
        tree.excepciones.push(error);
        tree.console.push(error.toString());
        return error;
      }
    }
  }
}
