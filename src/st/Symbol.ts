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
  ambito:String;


  constructor(ambito:String ,type: Type, identifier: String, value: Object, const_: Boolean,instList: Array<Node>, position:Number, tam:Number) {
    this.ambito=ambito;
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
    return ( this.ambito + ' - ' + this.type + ' - ' + this.identifier + ' - ' + this.value + ' - ' + this.const_ + ' - ' + this.position + ' - ' + this.tam);
  }

}
