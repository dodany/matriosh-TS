
export enum typesError {
  SEMANTICO = '[ERROR - SEMÁNTICO] - ',
  SINTACTICO = '[ERROR -SINTÁCTICO] - ',
  LEXICO = '[ERROR -LÉXICO] - '
}

export class TypeError {
  typeError: typesError;
  constructor(typeError: typesError) {
    this.typeError = typeError;
  }

}
