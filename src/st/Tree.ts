import {Node} from "../nodes/Node";
import {ExceptionST} from "./ExceptionST";
import { Symbol } from "./Symbol";

/**
 * @class Almacena el ast y ademas la lista de excepciones
 */
export class Tree {
    instructions: Array<Node>;
    excepciones: Array<ExceptionST>;
    console: Array<String>;
    pila: Array<Symbol>;

    /**
     * Retorna un arbol con 2 atributos: 1 ast y 1 lista de excepciones
     * @param instructions AST generado por la gramatica
     */
    constructor(instructions: Array<Node>) {
        this.instructions = instructions;
        this.excepciones = new Array<ExceptionST>();
        this.console = new Array<String>();
        this.pila= new Array<Symbol>();
    }
}
