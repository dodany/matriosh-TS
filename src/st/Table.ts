import { Symbol } from "./Symbol";
/**
 * @class En esta clase es donde vamos a guardar y obtener las variables y funciones
 */
export class Table{
    Previous: Table;
    Variables: Map<String, Symbol>;

    /**
     * @constructor Crea una nueva tabla
     * @param Previous Tabla anterior para manejar los ambitos
     */
    constructor(Previous: Table){
        this.Previous = Previous;
        this.Variables = new Map<String, Symbol>();
    }

    /**
     *
     * @method setVariable Almacena una variable,  verifica si existe
     * @param simbol Simbolo que contiene la informacion de la variable a almacenar
     */
    setVariable(symbol: Symbol){
        let env: Table;
        for(env = this; env != null; env = env.Previous){
            for(let key of Array.from( env.Variables.keys()) ) {
                if((key === symbol.identifier)){
                    return `La variable ${key} ya ha sido declarada.`;
                }
            }
        }
        this.Variables.set(symbol.ambito +'_'+ symbol.identifier , symbol);
        return symbol.identifier;
    }


    /**
     *
     * @method getVariable Obtiene una variable dentro de la tabla de simbolos
     * @param identifier Nombre de la variable a obtener
     */
    getVariable(ambito:String,identifier: String): Symbol{
        let env: Table;
        for(env = this; env != null; env = env.Previous){
            for(let key of Array.from( env.Variables.keys()) ) {

                if(key === ambito +'_' +identifier){
                  let a = env.Variables.get(key);
                    return env.Variables.get(key);
                }
            }
        }
        return null;
    }



}
