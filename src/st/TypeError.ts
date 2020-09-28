
export enum typesError {
  SEMANTICO = '[ERROR - SEMÁNTICO] - ',
  SINTACTICO = '[ERROR -Sintáctico] - ',
  LEXICO = '[ERROR -Léxico] - '
}

export class TypeError {
  typeError: typesError;
  constructor(typeError: typesError) {
    this.typeError = typeError;
  }

}
