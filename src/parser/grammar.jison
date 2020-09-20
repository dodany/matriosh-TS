%{
    const {Exception} = require('../utils/Exception');
    const {Type, types} = require('../utils/Type');
    const {Tree} = require('../Simbols/Tree');
    //EXPRESIONES
    const {ValueNode} = require('../node/Expresiones/ValueNode');
    const {ArithNode} = require('../node/Expresiones/ArithNode');
    const {RelationalNode} = require('../node//Expresiones/ArithNode');
    const {ContinueNode} = require('../node//Expresiones/ArithNode');
    const {BreakNode} = require('../node//Expresiones/ArithNode');
    const {LogidNode} = require('../node//Expresiones/ArithNode');
    const {idNode} = require('../node//Expresiones/ArithNode');
    //INSTRUCCIONES
    const {PrintNode} = require('../node//Instrucciones/PrintNode');
    const {IfNode} = require('../node//Instrucciones/IfNode');
    const {WhileNode} = require('../node//Instrucciones/WhileNode');
    const {DeclareNode} = require('../node//Instrucciones/DeclareNode');
    const {AsigNode} = require('../node/Instrucciones/AsigNode');
%}

%lex
%options case-sensitive
entero [0-9]+
decimal {entero}("."{entero})?
stringliteral (\"[^"]*\")
identifier ([a-zA-Z_])[a-zA-Z0-9_]*
%%

\s+                   /* skip whitespace */

{decimal}             return 'decimal'
{stringliteral}       return 'STRING_LITERAL'
"*"                   return '*'
"/"                   return '/'
";"                   return ';'
"-"                   return '-'
"+"                   return '+'
"*"                   return '*'

"<"                   return '<'
">"                   return '>'
"<="                  return '<='
">="                  return '>='
"=="                  return '=='
"!="                  return '!='
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
"break"               return 'break'
"continue"            return 'continue'
"while"               return 'while'
"numeric"             return 'number'
"string"              return 'string'
"boolean"             return 'boolean'
{identifier}          return 'identifier'
<<EOF>>	          return 'EOF'

/lex
%left 'else'
%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/'
%right '!'
%left UMENOS

%start INICIO

%%

INICIO : INSTRUCCIONES EOF {$$ = new Tree($1); return $$;}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { $$ = $1; $$.push($2); }
              | INSTRUCCION               { $$ = [$1]; }
              ;

INSTRUCCION : PRINT {$$ = $1;}
            | IF {$$ = $1;}
            | WHILE {$$ = $1;}
            | DECLARACION {$$ = $1;}
            | ASIGNACION {$$ = $1;}
            | 'continue' ';' {$$ = new ContinueNode(_$.first_line, _$.first_column)}
            | 'break' ';' {$$ = new BreakNode(_$.first_line, _$.first_column)}
            ;


DECLARACION : TIPO identifier '=' EXPRESION ';' {$$ = new DeclareNode($1, $2, $4, _$.first_line, _$.first_column);}
            ;

ASIGNACION : identifier '=' EXPRESION ';' {$$ = new AsigNode($1, $3, _$.first_line, _$.first_column);}
           ;

TIPO : 'numeric' {$$ = new Type(types.NUMBER);}
     | 'string' {$$ = new Type(types.STRING);}
     | 'boolean' {$$ = new Type(types.BOOLEAN);}
     ;

PRINT : 'print' '(' EXPRESION ')' ';' { $$ = new PrintNode($3, _$.first_line, _$.first_column);}
      ;

IF : 'if' CONDICION BLOQUE_INSTRUCCIONES {$$ = new IfNode($2, $3, [], _$.first_line, _$.first_column);}
   | 'if' CONDICION BLOQUE_INSTRUCCIONES 'else' BLOQUE_INSTRUCCIONES {$$ = new IfNode($2, $3, $5, _$.first_line, _$.first_column);}
   | 'if' CONDICION BLOQUE_INSTRUCCIONES 'else' IF {$$ = new IfNode($2, $3, [$5], _$.first_line, _$.first_column);}
   ;


WHILE : 'while' CONDICION BLOQUE_INSTRUCCIONES {$$ = new WhileNode($2, $3, _$.first_line, _$.first_column);}
      ;

BLOQUE_INSTRUCCIONES : '{' INSTRUCCIONES '}' {$$ = $2;}
                     | '{' '}' {$$ = [];}
                     ;


CONDICION : '(' EXPRESION ')' {$$ = $2;}
          ;

EXPRESION : '-' EXPRESION %prec UMENOS  { $$ = new ArithNode($1, null, '--', _$.first_line, _$.first_column); }
          | '!' EXPRESION	              { $$ = new ArithNode($1, null, '!', _$.first_line, _$.first_column); }
          | EXPRESION '+' EXPRESION		  { $$ = new ArithNode($1, $3, '+', _$.first_line, _$.first_column); }
          | EXPRESION '-' EXPRESION		  { $$ = new ArithNode($1, $3, '-', _$.first_line, _$.first_column); }
          | EXPRESION '*' EXPRESION		  { $$ = new ArithNode($1, $3, '*', _$.first_line, _$.first_column); }
          | EXPRESION '/' EXPRESION	    { $$ = new ArithNode($1, $3, '/', _$.first_line, _$.first_column); }

          | EXPRESION '<' EXPRESION		  { $$ = new RelationalNode($1, $3, '<', _$.first_line, _$.first_column); }
          | EXPRESION '>' EXPRESION		  { $$ = new RelationalNode($1, $3, '>', _$.first_line, _$.first_column); }
          | EXPRESION '>=' EXPRESION	  { $$ = new RelationalNode($1, $3, '>=', _$.first_line, _$.first_column); }
          | EXPRESION '<=' EXPRESION	  { $$ = new RelationalNode($1, $3, '<=', _$.first_line, _$.first_column); }
          | EXPRESION '==' EXPRESION	  { $$ = new RelationalNode($1, $3, '==', _$.first_line, _$.first_column); }
          | EXPRESION '!=' EXPRESION	  { $$ = new RelationalNode($1, $3, '!=', _$.first_line, _$.first_column); }

          | EXPRESION '||' EXPRESION	  { $$ = new LogicNode($1, $3, '&&', _$.first_line, _$.first_column); }
          | EXPRESION '&&' EXPRESION	  { $$ = new LogicNode($1, $3, '||', _$.first_line, _$.first_column); }

          | 'number'				            { $$ = new ValueNode(new Type(types.NUMERIC), Number($1), _$.first_line, _$.first_column); }
          | 'true'				              { $$ = new valueNode(new Type(types.BOOLEAN), true, _$.first_line, _$.first_column); }
          | 'false'				              { $$ = new valueNode(new Type(types.BOOLEAN), false, _$.first_line, _$.first_column); }
          | STRING_LITERAL			        { $$ = new valueNode(new Type(types.STRING), $1.replace(/\"/g,""), _$.first_line, _$.first_column); }
          | identifier			            { $$ = new IdNode($1, _$.first_line, _$.first_column); }
          | '(' EXPRESION ')'		        { $$ = $2; }
          ;
