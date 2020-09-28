
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
    const {idNode} = require('../nodes/Expresiones/idNode');
    const {PrintNode} =  require('../nodes/Instrucciones/PrintNode');
    const {IfNode} = require('../nodes/Instrucciones/IfNode');
    const {WhileNode} = require('../nodes/Instrucciones/WhileNode');
    const {DeclareNode} = require('../nodes/Instrucciones/DeclareNode');
    const {AsigNode} = require('../nodes/Instrucciones/AsigNode');

%}

%lex
%options case-sensitive
entero [0-9]+
decimal {entero}"."{entero}
stringliteral (\"[^"]*\")
identifier ([a-zA-Z_])[a-zA-Z0-9_]*
number [0-9]+("."[0-9]+)?\b
%%

\s+                                 /* skip whitespace */
{number}             return 'number'
"*"                   return '*'
"/"                   return '/'
";"                   return ';'
"-"                   return '-'
"+"                   return '+'
"++"                  return '++'
"--"                  return '--'
"%"                   return '%'
"**"                  return '**'
"<"                   return '<'
">"                   return '>'
"<="                  return '<='
">="                  return '>='
"=="                  return '=='
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
"print"               return 'print'
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
.                     { new ExceptionST( typesError.LEXICO,
                        yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column,
                        this.line,this.column); }

/lex
%left 'else'
%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
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

INSTRUCCION : PRINT             {$$ = { val:$1.val,
                                        node: newNode(yy, yystate, $1.node)  }}
            | GRAPH             {$$ = $1;}
            | IF                {$$ = { val:$1.val,
                                         node: newNode(yy, yystate, $1.node) }}
            | WHILE             {$$ = $1;}
            | SWITCH            {$$ = $1;}
            | DECLARACION       {$$ = $1;}
            | ASIGNACION        {$$ = $1;}
            | 'continue' ';'    {$$ = new ContinueNode(_$.first_line, _$.first_column)}
            | 'break' ';'       {$$ = new BreakNode(_$.first_line, _$.first_column)}
            | 'return' ';'      {$$ = new ReturnNode(null,_$.first_line, _$.first_column)}
            | 'return' EXP ';'  {$$ = new ReturnNode($2,_$.first_line, _$.first_column)}
            | error             {  new ExceptionST( typesError.SINTACTICO,
                                   yytext + ', en la linea: ' + _$.first_line + ', en la columna: ' + _$.first_column,
                                  _$.first_line,_$.first_column); }
            ;


DECLARACION : TIPO identifier '=' EXP ';' {$$ = new DeclareNode($1, $2, $4, _$.first_line, _$.first_column);}
            ;

ASIGNACION : identifier '=' EXP ';' {$$ = new AsigNode($1, $3, _$.first_line, _$.first_column);}
           ;

TIPO : 'number' {$$ = new Type(types.NUMBER);}
     | 'string' {$$ = new Type(types.STRING);}
     | 'boolean' {$$ = new Type(types.BOOLEAN);}
     ;

PRINT : 'console.log' '(' EXP ')' ';' { $$ = { val:new PrintNode($3.val, _$.first_line, _$.first_column),
                                               node: newNode(yy, yystate, $3.node)}                               }
      ;

GRAPH : 'graficar_ts' '('  ')' ';' { $$ = new GraphNode($3, _$.first_line, _$.first_column);}
      ;

IF : 'if' CONDICION BLOQUE_INSTRUCCIONES                              {$$ = { val: new IfNode($2.val, $3.val, [], _$.first_line, _$.first_column),
                                                                                            node: newNode(yy, yystate, $1, $2.node, $3.node)             }}
   | 'if' CONDICION BLOQUE_INSTRUCCIONES 'else' BLOQUE_INSTRUCCIONES  {$$ = { val: new IfNode($2.val, $3.val, $5.val, _$.first_line, _$.first_column),
                                                                                            node: newNode(yy, yystate, $1, $2.node, $3.node,$4,$5.node)  }}
   | 'if' CONDICION BLOQUE_INSTRUCCIONES 'else' IF                    {$$ = { val: new IfNode($2.val, $4.val, [$5].val, _$.first_line, _$.first_column),
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

WHILE : 'while' CONDICION BLOQUE_INSTRUCCIONES {$$ = new WhileNode($2, $3, _$.first_line, _$.first_column); }
      ;

BLOQUE_INSTRUCCIONES : '{' INSTRUCCIONES '}' {$$ = { val: $2.val,
                                                   node:$2.node }}
                     | '{' '}'               {$$ = { val:[],
                                                   node:$2.node }}
                     ;


CONDICION : '(' EXP ')' {$$ = { val: $2.val ,
                                node: newNode(yy, yystate, $1, $2.node) }} //DUDA
          | error       {  new ExceptionST( typesError.SINTACTICO,
                            yytext + ', en la linea: ' + _$.first_line + ', en la columna: ' + _$.first_column,
                            _$.first_line,_$.first_column); }
          ;

EXP : '-' EXP %prec UMENOS  { $$ = { val: new ArithNode($1.val, null, '-', _$.first_line, _$.first_column),
                                   node: newNode(yy, yystate, $1.node)}                                  }
          | EXP '+' EXP     { $$ = { val: new ArithNode($1.val, $3.val, '+', _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '-' EXP     { $$ = { val:  new ArithNode($1.val, $3.val, '-', _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '*' EXP     { $$ = { val:  new ArithNode($1.val, $3.val, '*', _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '/' EXP     { $$ = { val:  new ArithNode($1.val, $3.val, '/', _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '%' EXP     { $$ = { val:  new ArithNode($1.val, $3.val, '%', _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '**' EXP    { $$ = { val:  new ArithNode($1.val, $3.val, '**', _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '++'        { $$ = { val:  new ArithNode($1.val, null, '++',_$.first_line, _$.first_column),
                                 node: newNode(yy, yystate, $1.node)}                                     }
          | EXP '--'        { $$ = { val:  new ArithNode($1.val, null, '--',_$.first_line, _$.first_column),
                                  node: newNode(yy, yystate, $1.node)}                                     }
          | EXP '<' EXP     { $$ = { val: new RelationalNode($1.val, $3.val, '<', _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '>' EXP     { $$ = { val: new RelationalNode($1.val, $3.val, '>', _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '>=' EXP    { $$ = { val: new RelationalNode($1.val, $3.val, '>=', _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '<=' EXP    { $$ = { val: new RelationalNode($1.val, $3.val, '<=', _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '==' EXP    { $$ = { val: new RelationalNode($1.val, $3.val, '==', _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '!=' EXP    { $$ = { val: new RelationalNode($1.val, $3.val, '!=', _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }                    }
          | EXP '||' EXP    { $$ = { val: new LogicNode($1.val, $3.val, '&&', _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }              }
          | EXP '&&' EXP    { $$ = { val: new LogicNode($1.val, $3.val, '||', _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1.node, $2, $3.node) }              }
          | '!' EXP         { $$ = { val: new LogicNode($2, null, '!', _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1, $2.node)    }              } //DUDA
          | 'number'        { $$ = { val: new ValueNode(new Type(types.NUMBER), Number($1), _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1)} }
          | 'true'          { $$ = { val: new ValueNode(new Type(types.BOOLEAN), true, _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1)} }
          | 'false'         { $$ = { val: new ValueNode(new Type(types.BOOLEAN), false, _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1)} }
          | STRING_LITERAL  { $$ = { val: new ValueNode(new Type(types.STRING), $1.replace(/\"/g,""), _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1)} }
          | identifier      { $$ = { val: new IdNode($1, _$.first_line, _$.first_column),
                                    node: newNode(yy, yystate, $1)} }
          | '(' EXP ')'     { $$ = { val:$2.val,
                                    node: newNode(yy, yystate, $2.node)} }
          | error           {  new ExceptionST(typesError.SINTACTICO,
                                 yytext + ', en la linea: ' + _$.first_line + ', en la columna: ' + _$.first_column,
                              _$.first_line,_$.first_column); }
          ;
