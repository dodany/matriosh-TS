
/**
 * @Class Clase para almacenar errores, léxicos, sintácticos o semánticos
 */
export class ExceptionST {
    type: String;
    description: String;
    line: Number;
    column: Number;

    /**
     * Devuelve un objeto con la excepcion
     * @param type Tipo error, léxicos, sintácticos o semánticos
     * @param description Descripción del error
     * @param line Fila del error
     * @param column Columna del error
     */
    constructor ( type:String, description:String, line:Number, column:Number ){
      this.type= type;
      this.description= description;
      this.line= line;
      this.column=column;
    }

    toString(){
      return `${this.type} ${this.description} ${this.line} ${this.column}`;
  }

}
