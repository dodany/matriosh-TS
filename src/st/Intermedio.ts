export class Intermedio {
  private temporal: number;
  private etiqueta: number;
  private stack_pointer: number;
  private heap_pointer: number;
  private display_pointer: number;

  constructor() {
    this.temporal = -1;
    this.etiqueta = -1;
    this.stack_pointer = -1;
    this.heap_pointer = -1;
    this.display_pointer = -1;
  }

  public setSP(): number {
    this.stack_pointer++;
    return this.stack_pointer;
  }

  public getSP(): number {
    return this.stack_pointer;
  }

  public setHP(): number {
    this.heap_pointer++;
    return this.heap_pointer;
  }

  public setHp_memory(val: number) {
    this.heap_pointer += val;
  }

  public getHP(): number {
    return this.heap_pointer;
  }

  public retDisplay(): number {
    return this.display_pointer;
  }

  /**
   * genera un nuevo temporal
   */
  public newTemporal() {
    this.temporal++;
    return 'T' + this.temporal;
  }

  public getTemporal(){
    return 'T' + this.temporal;
  }

  /**
   * genera una nueva etiqueta
   */
  public newEtiqueta() {
    this.etiqueta++;
    return 'L' + this.etiqueta;
  }

  //**************************

  //*************Encabezado C
  public encabezado(temporal:String): String {
    let ini =
      '#include <stdio.h> //Importar para el uso de Printf' + this.enter_() +
      '#include <math.h> //Importar para el uso de math.h' + this.enter_() +
      'double heap[132000]; //Estructura para heap ' + this.enter_() +
      'double stack[132000]; //Estructura para stack ' + this.enter_() +
      'double p; //Puntero P ' + this.enter_() +
      'double h; //Puntero H ' + this.enter_()  +
      'double ' + this.allT(temporal);
    return ini;
  }

  public allT(temporal:String ): String {
    // lastT
    let n = temporal.substring(1);
    let t = '';
    for (var i = 0; i < Number(n); i++) {
      if (i == Number(n) - 1) {
        t += 'T' + i + ';';
      } else {
        t += 'T' + i + ',';
      }
    }

    return t;
  }

  public main_(): String {
   // return cadena + '\n\n' + 'int main {' + this.enter_();
    return '\n' + 'int main (){' + this.enter_();
  }

  public addFunction(cadena: String, id: String): String {
    let f_ini = 'void ' + id + '() {';
    return f_ini + cadena + this.enter_() + '}' + this.enter_() + this.enter_();
  }

  public addFunctionMain(cadena: String, ctx: Number, id: String): String {
    cadena += this.enter_() + 'p = p +' + ctx + this.semicolonEnter_();
    cadena += id + '()' + this.semicolonEnter_();
    cadena += 'p = p -' + ctx + this.semicolonEnter_();
    return cadena;
  }

  public cierre_main() {
  //  cadena +=
    return this.enter_() + 'return 0;' + this.enter_() + '}';
  }
  //************************

  //******STACK*************
  public StackpointerC3D( temporal: String, cadena: String, sp: Number, result: String, id:String ): String {
    cadena += this.enter_()+ this.comment(  '*Declare id ' + id );
    cadena += temporal + ' = ' + 'p' + ' + ' + sp + this.semicolonEnter_();
    cadena += 'stack[(int)' + temporal + '] = ' + result + this.semicolonEnter_();
    cadena +=this.comment(  '*Stack value ' + result);
    return cadena;
  }

  //******HEAP*************
  public HeapPointerC3D( temporal: String, cadena: String, hp: Number, result: String ): String {

    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        cadena += 'heap[(int)h] = ' + result.charCodeAt(i); +this.semicolonEnter_();
        cadena += 'h = h + 1'; +this.semicolonEnter_();
      }
    }
     cadena += 'heap[(int)h] = -1'; +this.semicolonEnter_();
    return cadena;
  }

  //*************************
  //AGREGAR FORMATO

  public comment( comentario: String) {
    return '//' + comentario + this.enter_();
  }

  public enter_(): String {
    return '\n';
  }

  public semicolonEnter_(): String {
    return ';\n';
  }

  //*************************
}
