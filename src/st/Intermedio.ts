export class Intermedio {
  private temporal: number;
  private etiqueta: number;

  constructor() {
    this.temporal = 0;
    this.etiqueta = 0;
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

  public format(line_cod: String) {
    return '\t' + line_cod + ';\n';
  }
}
