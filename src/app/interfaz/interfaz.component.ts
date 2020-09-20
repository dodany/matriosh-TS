import { Component, OnInit } from '@angular/core';

declare const arith_arbol: any;
declare const generateTree: any;

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

  constructor() {
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
