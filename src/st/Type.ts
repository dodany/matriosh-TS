export enum types {
  STRING,
  NUMBER,
  BOOLEAN,
  TYPE,
  ARRAY,
  VOID
}

export class Type {
  type: types;

  /***
   *
   */

  constructor(type: types) {
    this.type = type;
  }

  toString() {
    if (this.type === types.BOOLEAN) {
      return 'boolean';
    } else if (this.type === types.NUMBER) {
      return 'number';
    } else if (this.type === types.STRING) {
      return 'string';
    } else if (this.type === types.TYPE) {
      return 'type';
    } else if (this.type === types.ARRAY) {
      return 'array';
    } else if (this.type === types.VOID) {
      return 'void';
    }
  }
}
