import { Component, OnInit } from '@angular/core';
import { Table } from '../../st/Table';
import { ExceptionST } from '../../st/ExceptionST';
import { TypeError } from '../../st/TypeError';
import { ContinueNode } from '../../nodes/Expresiones/ContinueNode';
import { BreakNode} from '../../nodes/Expresiones/BreakNode';
import { DataService } from './data.service';

declare const arith_arbol: any;
declare const generateTree: any;
declare const grammar: any;

@Component({
  selector: 'app-interfaz',
  templateUrl: './interfaz.component.html',
  styleUrls: ['./interfaz.component.css'],
})

export class InterfazComponent implements OnInit {
  txtIn: string;
  txtOut: string;
  chkTree: boolean;
  chkConsola: boolean;
  chkError: boolean;
  txtoi: String;

  constructor( private dataSvc:DataService ) {
    this.chkTree = true;
    this.chkConsola = true;
    this.chkError = true;

  }

  ngOnInit(): void {
  }

  //SERVICIO POST

  saveNew(){

    this.dataSvc.analizar(this.txtIn);



  }


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

  OnEjecutarTs () {


    const tree = grammar.parse(this.txtIn);
    const tabla = new Table (null);
    this.txtOut = tree.val.toString();

    tree.instructions.map((m: any) => {
      const res = m.execute(tabla, tree);

      if (res instanceof BreakNode) {
        const error = new ExceptionST(TypeError.SEMANTICO,
          `Sentencia break fuera de un ciclo`,
          res.line, res.column);
        tree.excepciones.push(error);
        tree.console.push(error.toString());
      } else if (res instanceof ContinueNode) {
        const error = new ExceptionST(TypeError.SEMANTICO,
          `Sentencia continue fuera de un ciclo`,
          res.line, res.column);
        tree.excepciones.push(error);
        tree.console.push(error.toString());
      }
    });
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

}
