import { types } from './Type';

import { Type } from './Type';
export class Result {
  private valor: String;
  type: Type;
  private cadena: String;

  constructor(valor: String, type: Type, cadena: String) {
    this.valor = valor;
    this.type= type;
    this.cadena = cadena;
  }

}
