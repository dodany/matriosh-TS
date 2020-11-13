import { Node } from '../Node';
import { ExceptionST } from '../../st/ExceptionST';
import { types, Type } from '../../st/Type';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { TypeError, typesError } from '../../st/TypeError';
import { Intermedio } from '../../st/Intermedio';
import { Result } from '../../st/Result';

export class ArithNode extends Node {
  arg1: Node;
  arg2: Node;
  op: String;

  constructor(arg1: Node,arg2: Node,op: String,line: Number,column: Number) {
    super(null, line, column);
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.op = op;
  }

  genCode(table: Table, tree: Tree, intermedio: Intermedio) {
    const lResult = this.arg1.genCode(table, tree, intermedio);
    const rResult = this.arg2.genCode(table, tree, intermedio);

    let temporal = intermedio.newTemporal();
    let cadena = lResult.cadena + rResult.cadena;

    switch (this.op) {
      case '+':
        cadena += temporal + ' = ' + lResult.valor + ' + ' + rResult.valor + intermedio.semicolonEnter_();
        //cadena = intermedio.format(cadena);
        cadena += intermedio.comment('Suma de ' + lResult.valor + '+' + rResult.valor);
        break;
      case '-':
        break;

      //POTENCIA SOLO ENTEROS
      //STRINGS
    }

    return new Result(temporal, this.arg1.type ,cadena);
  }



  execute(table: Table, tree: Tree) {
    const lResult = this.arg1.execute(table, tree);
    if (lResult instanceof ExceptionST) {
      return lResult;
    }
    if (this.arg1 !== null) {
      if (this.arg2 !== null) {
        //VIENEN AMBOS NODOS
        const rResult = this.arg2.execute(table, tree);
        if (rResult instanceof ExceptionST) {
          return rResult;
        }

        console.log('arithNode');
        console.log(this.arg1.type.type);
        console.log(this.arg2.type.type);

        if (
          this.arg1.type.type === types.NUMBER &&
          this.arg2.type.type === types.NUMBER
        ) {
          this.type = new Type(types.NUMBER);
          switch (this.op) {
            case '+':
              console.log('suma normal');
              return lResult + rResult;
            case '-':
              return lResult - rResult;
            case '*':
              return lResult * rResult;
            case '/':
              if (rResult === 0) {
                const error = new ExceptionST(
                  typesError.SEMANTICO,
                  'La difición con cero no es permitida,',
                  '[' + this.line + ',' + this.column + ']'
                );

                tree.excepciones.push(error);

                return null;
              } else {
                return lResult / rResult;
              }
            case '%':
              return lResult % rResult;
            case '**':
              return lResult ** rResult;
            default:
              const error = new ExceptionST(
                typesError.SEMANTICO,
                'Operador desconocido, ',
                '[' + this.line + ',' + this.column + ']'
              );

              tree.excepciones.push(error);
              return null;
          }
        } else if (
          this.arg1.type.type === types.STRING &&
          this.arg2.type.type === types.STRING
        ) {
          this.type = new Type(types.STRING);
          switch (this.op) {
            case '+':
              return lResult + rResult;
            default:
              const error = new ExceptionST(
                typesError.SEMANTICO,
                'Operador desconocido, ',
                '[' + this.line + ',' + this.column + ']'
              );

              tree.excepciones.push(error);
              return null;
          }
        } else if (
          this.arg1.type.type === types.ARRAY &&
          this.arg2.type.type === types.ARRAY
        ) {
          //ARRAYS
          return null;
        } else if (
          (this.arg1.type.type === types.STRING &&
            this.arg2.type.type === types.NUMBER) ||
          (this.arg1.type.type === types.NUMBER &&
            this.arg2.type.type === types.STRING)
        ) {
          this.type = new Type(types.STRING);
          switch (this.op) {
            case '+':
              return lResult + rResult;
          }
        } else {
          const error = new ExceptionST(
            typesError.SEMANTICO,
            `No se pueden operar ` +
              this.arg1.type.toString() +
              ` y ` +
              ` ${this.arg2.type.toString()}` +
              ' - ',
            '[' + this.line + ',' + this.column + ']'
          );

          tree.excepciones.push(error);

          return null;
        }
      } else {
        // SOLO VIENE EL NODO IZQUIERDO

        if (this.arg1.type.type === types.NUMBER) {
          this.type = new Type(types.NUMBER);
          switch (this.op) {
            case '++':
              return lResult + 1;
            case '--':
              return lResult - 1;
            case '-':
              return lResult * -1;
            default:
              const error = new ExceptionST(
                typesError.SEMANTICO,
                'Operador desconocido, ',
                '[' + this.line + ',' + this.column + ']'
              );

              tree.excepciones.push(error);
              return null;
          }
        } else {
          //NO ES NUMBER
          const error = new ExceptionST(
            typesError.SEMANTICO,
            `Un operando aritmético debe ser de tipo number'. ${this.arg1.type.type}` +
              ',',
            '[' + this.line + ',' + this.column + ']'
          );

          tree.excepciones.push(error);
          return null;
        }
      }
    } else {
      return null;
    }
  }
}
