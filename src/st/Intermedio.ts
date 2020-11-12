export class Intermedio {
  private temporal: number;
  private etiqueta: number;
  private stack_pointer: number;
  private heap_pointer: number;
  private display_pointer: number;

  constructor() {
    this.temporal = -1;
    this.etiqueta = -1;
    this.stack_pointer=-1;
    this.heap_pointer=-1;
    this.display_pointer=-1;
  }

  public setSP() :number {
    this.stack_pointer++;
  return this.stack_pointer;
  }

  public getSP():number {
    return this.stack_pointer;
  }

  public setHP():number {
    this.heap_pointer++;
    return this.heap_pointer;
  }

  public setHp_memory(val:number){
    this.heap_pointer+= val;
  }

  public getHP(): number {
    return this.heap_pointer;
  }

  public retDisplay():number{
    return this.display_pointer;
  }

  /**
   * genera un nuevo temporal
   */
  public newTemporal() {
    this.temporal++;
    return 'T' + this.temporal;
  }

  /**
   * genera una nueva etiqueta
   */
  public newEtiqueta() {
    return 'L' + this.etiqueta++;
  }

  //AGREGAR FORMATO
  public format(line_cod: String) {
    return  line_cod + ';\n';
  }

  public comment(line_cod: String, comentario: String){
    return line_cod  + '//' + comentario  + '\n';
  }

}
