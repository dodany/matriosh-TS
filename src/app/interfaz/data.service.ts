import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Table } from '../../st/Table';
import { ExceptionST } from '../../st/ExceptionST';
import { TypeError } from '../../st/TypeError';
import { ContinueNode } from '../../nodes/Expresiones/ContinueNode';
import { BreakNode} from '../../nodes/Expresiones/BreakNode';

import { environment } from '../../environments/environment';




declare const arith_arbol: any;
declare const generateTree: any;
//declare const grammar: any;

@Injectable({
  providedIn: 'root',
})

export class DataService {

  private API_URL= environment.API_URL;
  private urlExecute = '/ejecudtar';


  constructor(
    private _http: HttpClient) {
    console.log(this.API_URL);
  }

  login(cadena: string): Observable<any>{

    const parser = require('../../parser/grammar.js');
    let a:string;

    console.log ("hoara");


    console.log(`${this.API_URL}/ejecutar`);
    return this._http.post<any>(`${this.API_URL}/ejecutar`,   {



        a:parser.parse(cadena),
        clave:"a"
    });
  }



  analizar(cadena: any): Observable<any> {
   /* const tree = parser.parse(cadena);
    const tabla = new Table(null);

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
    });*/
    //const tree = grammar.parse(cadena);

    return this._http.post(this.API_URL +this.urlExecute,   cadena+ "Dodany");
  }
}
