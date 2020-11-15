import { Node } from '../Node';
import { Table } from '../../st/Table';
import { Tree } from '../../st/Tree';
import { Symbol } from '../../st/Symbol';
import { ContinueNode } from '../Expresiones/ContinueNode';
import { BreakNode } from '../Expresiones/BreakNode';
import { types, Type } from 'src/st/Type';
import { ExceptionST } from '../../st/ExceptionST';
import { TypeError, typesError } from '../../st/TypeError';
import { Intermedio } from '../../st/Intermedio';
import { Result } from '../../st/Result';
import { DeclareNode } from './DeclareNode';

export class FunctionNode extends Node {
  type: Type;
  id: String;
  instList: Array<Node>;
  param: Array<Node>;

  constructor(type: Type,id: String,instList: Array<Node>,line: Number,column: Number,param: Array<Node>) {
    super(type, line, column);
    this.type = type;
    this.id = id;
    this.instList = instList;
    this.param = param;
  }

  //****GENERACIÓN C3D
  genCode(table: Table, tree: Tree, intermedio: Intermedio) {
    let ambito = 'fun_' + this.id + '()'; //Este es mi ambito
    intermedio.setAmbito(this.id);
    let tamID = 0;
    let cadena:String="";

    //CALCULAR EL TAMAÑO DE LAS VARIABLES
    for (let i = 0; i < this.instList.length; i++) {
      if (this.instList[i] instanceof DeclareNode) {
        tamID++;
      }
    }
    //TAMAÑO DE LA FUNTION"""
    let tam = this.param.length + tamID + 1;

    //******FUNCION ********/
    //******FUNCION ********/
    let var_: Symbol;
    var_ = table.getVariable(intermedio.getAmbito(), this.id);

    if (var_ == null) {
      //NO EXISTE

      // Valor del Stack_pointer
      let sp = intermedio.setSP();
      let symbol: Symbol;

      symbol = new Symbol(intermedio.getAmbito(),this.type,this.id,null,true,this.instList,sp,tam);

      //INSERTAR en la tabla de simbolos
      const res = table.setVariable(symbol);
      if (res == null) {
        //Error
        const error = new ExceptionST(typesError.SEMANTICO,res + ',','[' + this.line + ',' + this.column + ']');
        tree.excepciones.push(error);
      } else {

        //****** PARAMETROS ********/
        for (let i = 0; i < this.param.length; i++) {

          var_ = table.getVariable(intermedio.getAmbito(),this.param[i].genCode(table, tree, intermedio).valor);
          if (var_ == null) {
            //NO EXISTE
            sp = intermedio.setSP();
            let temporal = intermedio.newTemporal();
            symbol = new Symbol(intermedio.getAmbito(),this.param[i].genCode(table, tree, intermedio).type,this.param[i].genCode(table, tree, intermedio).valor,0,true,null,sp,1);
            cadena = intermedio.StackpointerC3D(temporal, cadena, sp,"0",this.id, "Declare en función");

            //INSERTAR en la tabla de simbolos
            const res = table.setVariable(symbol);
            if (res == null) {
              //Error
              const error = new ExceptionST(typesError.SEMANTICO,res + ',','[' + this.line + ',' + this.column + ']');
              tree.excepciones.push(error);
            } else {
              // LO INSERTO
              tree.console.push(cadena);
                        }
          } else {
            //ERROR
            // YA EXISTE el id
            const error = new ExceptionST(typesError.SEMANTICO,'Parámetro ya existe ' + this.id + +',','[' + this.line + ',' + this.column + ']');
            tree.excepciones.push(error);
            return '';
          }
        }

       //******  DECLARENODE ********/
        for (let i = 0; i < this.instList.length; i++) {
          if (this.instList[i] instanceof DeclareNode) {
            const res = this.instList[i].genCode(table, tree, intermedio);
          }
        }

        //****** RETURN ********/
        sp = intermedio.setSP();
        let temporal = intermedio.newTemporal();

        symbol= new Symbol (intermedio.getAmbito(), this.type , "return", 0, true,[], sp,1);
        cadena = intermedio.StackpointerC3D(temporal, cadena, sp,"0",this.id, "Declare en función");

      //INSERTAR en la tabla de simbolos
      const res = table.setVariable(symbol);
      if (res == null) {
        //Error
        const error = new ExceptionST(typesError.SEMANTICO,res + ',','[' + this.line + ',' + this.column + ']');
        tree.excepciones.push(error);
      } else {
        // Lo inserto
        tree.console.push(cadena);
      }


      }
    } else {
      // YA EXISTE el id
      const error = new ExceptionST(typesError.SEMANTICO,'Función ya existe ' + this.id + +',','[' + this.line + ',' + this.column + ']');
      tree.excepciones.push(error);
      return '';
    }

    intermedio.setAmbito('main')
    return new Result(intermedio.getTemporal(), this.type, cadena);
    //return '';
  }


  //*********************EXECUTE
  execute(table: Table, tree: Tree) {
    let symbol: Symbol;
    const newTable = new Table(table);
    //symbol = new Symbol(ambito,this.type, this.id, null, true, this.instList);
    const res = table.setVariable(symbol);
    if (res != null) {
      const error = new ExceptionST(
        typesError.SEMANTICO,
        res + ',',
        '[' + this.line + ',' + this.column + ']'
      );
      tree.excepciones.push(error);
    }

    for (let i = 0; i < this.instList.length; i++) {
      const res = this.instList[i].execute(newTable, tree);

      if (res instanceof ContinueNode || res instanceof BreakNode) {
        return res;
      }
    }

    return null;
  }
}
