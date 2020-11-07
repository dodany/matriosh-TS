
%{
    const {TypeError, typesError} =require('../st/TypeError');
    const {ExceptionST} =  require('../st/ExceptionST');
    const {Type, types} = require('../st/Type');
    const {Tree}  = require('../st/Tree');
    const {ValueNode} = require('../nodes/Expresiones/ValueNode');
    const {ArithNode} = require('../nodes/Expresiones/ArithNode');
    const {RelationalNode} = require('../nodes/Expresiones/RelationalNode');
    const {ContinueNode} = require('../nodes/Expresiones/ContinueNode');
    const {BreakNode} = require('../nodes/Expresiones/BreakNode');
    const {ReturnNode} = require('../nodes/Expresiones/ReturnNode');
    const {LogicNode} = require('../nodes/Expresiones/LogicNode');
    const {IdNode} = require('../nodes/Expresiones/IdNode');
    const {PrintNode} =  require('../nodes/Instrucciones/PrintNode');
    const {IfNode} = require('../nodes/Instrucciones/IfNode');
    const {WhileNode} = require('../nodes/Instrucciones/WhileNode');
    const {DeclareNode} = require('../nodes/Instrucciones/DeclareNode');
    const {AsigNode} = require('../nodes/Instrucciones/AsigNode');
    const {ErrorNode}  = require('../nodes/Instrucciones/ErrorNode');
    const {GraphNode}  = require('../nodes/Instrucciones/GraphNode');
    const {FunctionNode} = require('../nodes/Instrucciones/FunctionNode');
    const {CallNode} = require('../nodes/Instrucciones/CallNode');
    const {TernarioNode} = require('../nodes/Instrucciones/TernarioNode');
    const {ForNode} = require('../nodes/Instrucciones/ForNode');

    let count = 0;
function newTemp() {
    count++;
return "t"+count;
let cadena;
}

%}

%lex
%options case-sensitive
entero [0-9]+
decimal {entero}"."{entero}
stringliteral (\'[^']*\')|(\"[^"]*\")
identifier ([a-zA-Z_])[a-zA-Z0-9_]*
number [0-9]+("."[0-9]+)?\b
%%

\s+                                 /* skip whitespace */
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas
{number}             return 'number'
"**"                  return '**'
"*"                   return '*'
"/"                   return '/'
";"                   return ';'
"-"                   return '-'
"+"                   return '+'
"++"                  return '++'
"--"                  return '--'
"%"                   return '%'
"<"                   return '<'
">"                   return '>'
"<="                  return '<='
">="                  return '>='
"=="                  return '=='
":"                   return ':'
"!="                  return '!='
"?"                   return '?'
"||"                  return '||'
"&&"                  return '&&'
"!"                   return '!'
"="                   return '='
"("                   return '('
")"                   return ')'
"["                   return '['
"]"                   return ']'
"{"                   return '{'
"}"                   return '}'
"true"                return 'true'
"false"               return 'false'
"if"                  return 'if'
"else"                return 'else'
"while"               return 'while'
"switch"              return 'switch'
"case"                return 'case'
"do"                  return 'do'
"for"                 return 'for'
"of"                  return 'of'
"in"                  return 'in'
"break"               return 'break'
"continue"            return 'continue'
"return"              return 'return'
"number"              return 'number'
"string"              return 'string'
"boolean"             return 'boolean'
"void"                return 'void'
"type"                return 'type'
"push"                return 'push'
"pop"                 return 'pop'
"length"              return 'length'
"let"                 return 'let'
"const"               return 'const'
"function"            return 'function'
"console.log"         return 'console.log'
"graficar_ts"         return 'graficar_ts'
{identifier}          return 'identifier'
{stringliteral}       return 'STRING_LITERAL'
<<EOF>>               return 'EOF'
.                     { console.log('Este es un error léxico: ' + yytext + ', en la linea: ' +
                        yylloc.first_line + ', en la columna: ' + yylloc.first_column);

                        new ErrorNode( new ExceptionST(  typesError.LEXICO,
                                          "Carácter no reconocido "+ yytext 	+ " - " ,
                                      "[" + yylloc.first_line +"," + yylloc.first_colum + "]"));
                          }

/lex
%left 'else'
%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left  '+', '-'
%left '*', '/', '%', '**'
%left '++', '--'
%right '!'
%left UMENOS

%start INICIO

%%

INICIO : INSTRUCCIONES EOF {$$ = {val: new Tree($1.val),
                                  node: newNode(yy, yystate, $1.node, $2, 'EOF') }
                            return $$; }
                            ;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { $$ = {val: $1.val,
                                                 node: newNode(yy, yystate, $1.node,$2.node)} ;
                                                 $$.val.push($2.val); }
              | INSTRUCCION               { $$ = {val: [$1.val],
                                                  node: newNode(yy, yystate, $1.node)} }
              ;

INSTRUCCION : FUNCTION          {$$ = { val:$1.val,
                                       node: newNode(yy, yystate, $1.node)  }}
            | CALLFUNCTION      {$$ = { val:$1.val,
                                       node: newNode(yy, yystate, $1.node)  }}
            | PRINT             {$$ = { val:$1.val,
                                       node: newNode(yy, yystate, $1.node)  }}
            | GRAPH             {$$ = { val:$1.val,
                                       node: newNode(yy, yystate, $1.node)  }}
            | IF                {$$ = { val:$1.val,
                                       node: newNode(yy, yystate, $1.node)  }}
            | TERNARIO          {$$ = { val:$1.val,
                                       node: newNode(yy, yystate, $1.node)  }}
            | WHILE             {$$ = { val:$1.val,
                                       node: newNode(yy, yystate, $1.node)  }}
            | DO                {$$ = { val:$1.val,
                                       node: newNode(yy, yystate, $1.node)  }}
                                       /*
            | FOR               {$$ = { val:$1.val,
                                       node: newNode(yy, yystate, $1.node)
                                       console.log("FOR"); }} */
            | SWITCH            {$$ = { val:$1.val,
                                       node: newNode(yy, yystate, $1.node)  }}
            | DECLARACION       {$$ = { val:$1.val,
                                       node: newNode(yy, yystate, $1.node)  }}
            | ASIGNACION        {$$ = { val:$1.val,
                                       node: newNode(yy, yystate, $1.node) }}
            | 'continue' ';'    {$$ = { val: new ContinueNode(this._$.first_line, this._$.first_column),
                                       node: newNode(yy, yystate, $1.node) }}
            | 'break' ';'       {$$ = { val: new BreakNode(this._$.first_line, this._$.first_column),
                                       node: newNode(yy, yystate, $1.node) }}
            | 'return' ';'      {$$ = { val: new ReturnNode(null,this._$.first_line, this._$.first_column),
                                       node: newNode(yy, yystate, $1.node) }}
            | 'return' EXP ';'  {$$ = { val:new ReturnNode($2.val,this._$.first_line, this._$.first_column),
                                       node: newNode(yy, yystate, $1.node) }}
            | error             {$$ ={ val: new ErrorNode( new ExceptionST(  typesError.SINTACTICO,
                                          "Instrucción no reconocida "+ $1 	+ " - " ,
                                      "[" + this._$.first_line +"," + this._$.first_column + "]")),
                                       node: newNode(yy, yystate, [])   } }
            ;

FUNCTION :  'function' identifier '(' ')' '{'  INSTRUCCIONES   '}' {$$ = { val: new FunctionNode (new Type(types.VOID),$2, $6.val,this._$.first_line, this._$.first_column),
                                                  node: newNode(yy, yystate, $1,$2,$6.node )  }}
         ;

CALLFUNCTION: identifier '(' ')' ';'  {  $$ ={ val: new CallNode($1, this._$.first_line, this._$.first_column),
                                              node: newNode(yy, yystate, $1)  }}
            ;

DECLARACION : 'TIPOF' identifier '=' EXP ';'          {$$ = { val: new DeclareNode($4.val.type, $2, $4.val,
                                                        this._$.first_line, this._$.first_column,$1.val),
                                                             node: newNode(yy, yystate, $2, $4.node)  }}
            | 'TIPOF' identifier ':' TIPO '=' EXP ';' {$$ = { val: new DeclareNode($4.val, $2, $6.val,
                                                        this._$.first_line, this._$.first_column, $1.val),
                                                             node: newNode(yy, yystate, $2, $6.node)  }}
            ;

ASIGNACION : identifier '=' EXP ';' {$$ = { val: new AsigNode($1, $3.val, this._$.first_line, this._$.first_column),
                                           node: newNode(yy, yystate, $1, $2, $3.node) }}

           ;

TIPOF : 'let'  {$$ ={ val: false,
                     node: newNode(yy, yystate, $1)  }}
      | 'const' {$$ ={ val: true,
                     node: newNode(yy, yystate, $1)  }}
     ;

TIPO : 'number'  {$$ = { val: new Type(types.NUMBER),
                        node: newNode(yy, yystate, $1) }}
     | 'string'  {$$ = { val: new Type(types.STRING),
                        node: newNode(yy, yystate, $1) }}
     | 'boolean' {$$ = { val:new Type(types.BOOLEAN),
                        node: newNode(yy, yystate, $1) }}
     | 'types'   {$$ = { val:new TYPE(types.TYPE),
                        node: newNode(yy, yystate, $1) }}
     ;

PRINT : 'console.log' '(' EXP ')' ';' { $$ = { val: new PrintNode($3.val, this._$.first_line, this._$.first_column),
                                              node: newNode(yy, yystate, $3.node)                                   }}
      ;

GRAPH : 'graficar_ts' '('  ')' ';' { $$ = { val: new GraphNode(this._$.first_line, this._$.first_column),
                                              node: newNode(yy, yystate, $1)                                           }}
      ;

IF : 'if' CONDICION BLOQUE_INSTRUCCIONES                              {$$ = { val: new IfNode($2.val, $3.val, [], this._$.first_line, this._$.first_column),
                                                                                            node: newNode(yy, yystate, $1, $2.node, $3.node)             }}
   | 'if' CONDICION BLOQUE_INSTRUCCIONES 'else' BLOQUE_INSTRUCCIONES  {$$ = { val: new IfNode($2.val, $3.val, $5.val, this._$.first_line, this._$.first_column),
                                                                                            node: newNode(yy, yystate, $1, $2.node, $3.node,$4, $5.node)             }}
   | 'if' CONDICION BLOQUE_INSTRUCCIONES 'else' IF                    {$$ = { val: new IfNode($2.val, $4.val, [$5].val, this._$.first_line, this._$.first_column),
                                                                                            node: newNode(yy, yystate, $1, $2.node, $4.node,$6,$8.node)  }}
   ;


//SWITCH
SWITCH : 'switch' CONDICION '{' CASELIST '}'
      ;

CASELIST : CASELIST CASE
        |CASE
        ;

CASE : 'case' CONDICION ':'
      ;

WHILE : 'while' CONDICION BLOQUE_INSTRUCCIONES {$$ = { val: new WhileNode($2.val, $3.val, this._$.first_line, this._$.first_column),
                                               node: newNode(yy, yystate, $1, $2.node, $3.node)        }}
      ;

DO :  'do' BLOQUE_INSTRUCCIONES 'while' CONDICION ';' {$$ = { val: new WhileNode($4.val, $2.val, this._$.first_line, this._$.first_column),
                                                         node: newNode(yy, yystate, $1, $2.node, $4.node)        }}
      ;
/*
FOR : 'for' '(' 'let' identifier '=' EXP ';'  EXP ';' EXP ')' '{' BLOQUE_INSTRUCCIONES '}'
        {$$ = {val: new ForNode (  $4, $5.node, $7.node, $9.node ,  this._$.first_line, this._$.first_column ) ,
             node: newNode(yy, yystate, $4, $5.node, $7.node,$9.node)};
             console.log("forrrrrrrrrrrrrrrrrrrrr");  }
    ;
*/
BLOQUE_INSTRUCCIONES : '{' INSTRUCCIONES '}' {$$ = { val: $2.val,
                                                   node:$2.node }}
                     | '{' '}'               {$$ = { val:[],
                                                   node:$2.node }}
                     ;


CONDICION : '(' EXP ')' {$$ = { val: $2.val ,
                                node: newNode(yy, yystate, $2.node) }}
                    ;

EXP : '-' EXP %prec UMENOS  { $$ = { val: new ArithNode($1.val, null, '-', this._$.first_line, this._$.first_column),
                                   node: newNode(yy, yystate, $1.node)}                                  }

          | EXP '+' EXP     { $$ = { val: new ArithNode($1.val, $3.val, '+', this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }    }

          | EXP '-' EXP     { $$ = { val:  new ArithNode($1.val, $3.val, '-', this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '*' EXP     { $$ = { val:  new ArithNode($1.val, $3.val, '*', this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '/' EXP     { $$ = { val:  new ArithNode($1.val, $3.val, '/', this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '%' EXP     { $$ = { val:  new ArithNode($1.val, $3.val, '%', this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '**' EXP    { $$ = { val:  new ArithNode($1.val, $3.val, '**', this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '++'        { $$ = { val:  new ArithNode($1.val, null, '++',this._$.first_line, this._$.first_column),
                                 node: newNode(yy, yystate, $1.node)}                                     }
          | EXP '--'        { $$ = { val:  new ArithNode($1.val, null, '--',this._$.first_line, this._$.first_column),
                                  node: newNode(yy, yystate, $1.node)}                                     }
          | EXP '<' EXP     { $$ = { val: new RelationalNode($1.val, $3.val, '<', this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '>' EXP     { $$ = { val: new RelationalNode($1.val, $3.val, '>', this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '>=' EXP    { $$ = { val: new RelationalNode($1.val, $3.val, '>=', this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '<=' EXP    { $$ = { val: new RelationalNode($1.val, $3.val, '<=', this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '==' EXP    { $$ = { val: new RelationalNode($1.val, $3.val, '==', this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '!=' EXP    { $$ = { val: new RelationalNode($1.val, $3.val, '!=', this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '||' EXP    { $$ = { val: new LogicNode($1.val, $3.val, '&&', this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }              }
          | EXP '&&' EXP    { $$ = { val: new LogicNode($1.val, $3.val, '||', this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }              }
          | '!' EXP         { $$ = { val: new LogicNode($2.val, null, '!', this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1, $2.node)    }              } //DUDA

          | 'number'        { $$ = { val: new ValueNode(new Type(types.NUMBER), Number($1), this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1)} }

          | 'true'          { $$ = { val: new ValueNode(new Type(types.BOOLEAN), true, this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1)} }

          | 'false'         { $$ = { val: new ValueNode(new Type(types.BOOLEAN), false, this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1)} }
          | STRING_LITERAL  { $$ = { val: new ValueNode(new Type(types.STRING), $1.replace(/\"/g,"").replace(/\'/g,""), this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1)} }

          | identifier      { $$ = { val: new IdNode($1, this._$.first_line, this._$.first_column),
                                    node: newNode(yy, yystate, $1)    }}
          | '(' EXP ')'     { $$ = { val:$2.val,
                                    node: newNode(yy, yystate, $2.node)   }}
          ;
