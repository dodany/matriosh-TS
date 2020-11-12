import { Type } from './Type';
import { Node } from '../nodes/Node';

export class Symbol {

  type: Type;
  identifier: String;
  value: Object;
  const_: Boolean;
  instList: Array<Node>;
  position: Number;
  tam: Number;

  /**
   * @constructor Para crear un nuevo simbolo a utilizar en una tabla de simbolos o funciones
   * @param type Tipo de la varible o funcion
   * @param identifier Nombre de la variable o funcion
   * @param value Valor de la variable u objeto completo de la función
   */


  constructor(type: Type, identifier: String, value: Object, const_: Boolean,instList?: Array<Node>, position?:Number, tam?:Number) {
    this.type = type;
    this.identifier = identifier;
    this.value = value;
    this.const_ = const_;
    this.instList = instList;
    this.position = position;
    this.tam= tam;
  }



/***
 *Imprimir
 */
  toString() {

      return (this.type + ' - ' + this.identifier + ' - ' + this.value + ' - ' + this.const_ + ' -  ' + this.position + ' - ' + this.tam);
    //} else {
      //return ( this.type + ' - ' + this.identifier + ' - ' + this.value + ' - ' + this.const_ + ' <INSTRUCCIONES> ' );
    //}
  }

}
