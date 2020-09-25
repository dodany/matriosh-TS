export enum types{
  STRING,
  NUMBER,
  BOOLEAN,
  VOID,
  TYPES,
  ARRAY
}

export class Type{
  type: types;

  /***
   *
   */

  constructor(type: types){
    this.type=type;
  }

  toString(){
    if(this.type === types.BOOLEAN){
        return 'boolean';
    }else if(this.type === types.NUMBER){
        return 'number';
    }else if(this.type === types.STRING){
        return 'string';
    }
}

}
