import {
  Component,
  OnInit,
  ElementRef,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { Table } from '../../st/Table';
import { ExceptionST } from '../../st/ExceptionST';
import { typesError } from '../../st/TypeError';
import { ContinueNode } from '../../nodes/Expresiones/ContinueNode';
import { BreakNode } from '../../nodes/Expresiones/BreakNode';
import CodeMirror from 'codemirror';
import { Intermedio } from 'src/st/Intermedio';
import { DeclareNode } from 'src/nodes/Instrucciones/DeclareNode';

declare const arith_arbol: any;
declare const generateTree: any;
const grammar = require('../../parser/grammar.js');

//GRAMMAR_3D
const grammar3D = require('../../parser/grammar_tree.js');

//GRAMMAR_AST
const grammarAST = require('../../parser/grammar_tree.js');

@Component({
  selector: 'app-interfaz',
  templateUrl: './interfaz.component.html',
  styleUrls: ['./interfaz.component.css'],
})
export class InterfazComponent implements OnInit {
  txtIn: string;
  txtOut: string;
  txtErrores: string;
  txtPila: string;
  chkTree: boolean;
  chkConsola: boolean;
  chkError: boolean;
  txtoi: String;
  //
  editor: any;
  editorNativeElement: any;
  height: number;

  constructor(elRef: ElementRef) {
    //private _dataSvc:DataService
    this.chkTree = true;
    this.chkConsola = true;
    this.chkError = true;
  }

  ngOnInit(): void {}

  /**
   *
   * EJECUTAR
   */
  onEjecutar() {
    const result = arith_arbol.parse(this.txtIn);
    this.txtOut = result.val.toString();

    if (this.chkTree) {
      if (<HTMLInputElement>document.getElementById('grafo')) {
        (<HTMLInputElement>document.getElementById('grafo')).remove();
        //(<HTMLInputElement>document.getElementById('tree')).hidden=true;
      }
      generateTree([result.node]);
    } else {
      (<HTMLInputElement>document.getElementById('grafo')).remove();
      // (<HTMLInputElement>document.getElementById('tree')).hidden=true;
    }
  }

  OnEjecutarTs() {
    const tree_ant = grammar.parse(this.txtIn);
    const tree = tree_ant.val;

    grammar3D;

    const tabla = new Table(null);

    tree.instructions.map((m: any) => {
      const res = m.execute(tabla, tree);

      //IMPRIME TODOS LOS NODOS
      console.log(m);

      if (res instanceof BreakNode) {
        const error = new ExceptionST(
          typesError.SEMANTICO,
          `Sentencia break fuera de un ciclo` + ',',
          '[' + res.line + ',' + res.column + ']'
        );
        tree.excepciones.push(error);
      } else if (res instanceof ContinueNode) {
        const error = new ExceptionST(
          typesError.SEMANTICO,
          `Sentencia continue fuera de un ciclo` + ',',
          '[' + res.line + ',' + res.column + ']'
        );
        tree.excepciones.push(error);
      }
    });

    this.txtOut = tree.console.join('\n');
    //ERRORES
    this.txtErrores = tree.excepciones.join('\n');
    //PILA
    this.txtPila = tree.pila.join('\n');

    if (this.chkTree) {
      if (<HTMLInputElement>document.getElementById('grafo')) {
        (<HTMLInputElement>document.getElementById('grafo')).remove();
      }
      generateTree([tree_ant.node]);
    } else {
      (<HTMLInputElement>document.getElementById('grafo')).remove();
    }
  }

  /**
   *
   * TRADUCIR
   */
  onTraducir() {}

  /**
   *
   * LIMPIAR CONSOLA ENTRADA
   */
  onCleanIn() {
    this.txtIn = '';
  }

  /**
   *
   * LIMPIAR CONSOLA SALIDA
   */
  onCleanOut() {
    this.txtOut = '';
  }

  onCleanError() {
    this.txtErrores = '';
  }

  onCleanPila() {
    this.txtPila = '';
  }

  ////
  OnEjecutar3D() {
    const tree_ant = grammar3D.parse(this.txtIn);
    const tree = tree_ant.C3D; //const tree = tree_ant.val;
    const tabla = new Table(null);
    const intermedio = new Intermedio();

    tree.instructions.map((m: any) => {
      const res = m.genCode(tabla, tree, intermedio);
      //IMPRIME TODOS LOS NODOS
      console.log(m);

      if (res instanceof BreakNode) {
        const error = new ExceptionST(
          typesError.SEMANTICO,
          `Sentencia break fuera de un ciclo` + ',',
          '[' + res.line + ',' + res.column + ']'
        );
        tree.excepciones.push(error);
      } else if (res instanceof ContinueNode) {
        const error = new ExceptionST(
          typesError.SEMANTICO,
          `Sentencia continue fuera de un ciclo` + ',',
          '[' + res.line + ',' + res.column + ']'
        );
        tree.excepciones.push(error);
      }
    });


    let contenido = tree.console.join('\n');
    this.txtOut = this.encabezado(intermedio.newTemporal()) + contenido +  this.cierre();

    //ERRORES
    this.txtErrores = tree.excepciones.join('\n');
    //PILA
    let pila = tree.pila.join('\n');
    this.txtPila = this.encabezado_pila() + pila ;
  }

  encabezado_pila(){
    let ini= 'Type  -' +  ' id -'  + ' Val -' + ' Const -' +  ' Pos -' + ' size  '+ '\n';
    return ini;
  }

  //Encabezado C
  encabezado(last: String): String {
    let ini =
      '#include <stdio.h> //Importar para el uso de Printf' +
      '\n' +
      'double heap[132000]; //Estructura para heap ' +
      '\n' +
      'double stack[132000]; //Estructura para stack ' +
      '\n' +
      'double p; //Puntero P ' +
      '\n' +
      'double h; //Puntero H ' +
      '\n' +
      'double ';

    // las t
    let n = last.substring(1);
    let t = '';
    for (var i = 0; i < Number(n); i++) {
      if (i == Number(n) - 1) {
        t += 'T' + i + ';';
      } else {
        t += 'T' + i + ',';
      }
    }

    let main = '\n\n' + 'int main() { ' + '\n';
    return ini + t + main;
  }

  cierre(){
    return '\n' + "return 0;"  +'\n' + '}'
  }
}
