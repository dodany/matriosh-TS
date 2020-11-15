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
    const {DeclareArrayNode} = require('../nodes/Instrucciones/DeclareArrayNode');
    const {AsigNode} = require('../nodes/Instrucciones/AsigNode');
    const {ErrorNode}  = require('../nodes/Instrucciones/ErrorNode');
    const {GraphNode}  = require('../nodes/Instrucciones/GraphNode');
    const {FunctionNode} = require('../nodes/Instrucciones/FunctionNode');
    const {CallNode} = require('../nodes/Instrucciones/CallNode');
    const {TernarioNode} = require('../nodes/Instrucciones/TernarioNode');
    const {ForNode} = require('../nodes/Instrucciones/ForNode');
    const {ParamNode} = require('../nodes/Instrucciones/ParamNode');
    const {CaseNode} = require('../nodes/Instrucciones/CaseNode');
    const {SwitchNode} = require('../nodes/Instrucciones/SwitchNode');
    const {ForInOfNode} = require('../nodes/Instrucciones/ForInOfNode');
    const {TypesNode} = require('../nodes/Instrucciones/TypesNode');
    //const {Intefaz} = require( '../app/interfaz/interfaz.component.ts');
%}

%lex
%options case-insensitive
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
"++"                  return '++'
"--"                  return '--'
"<="                  return '<='
">="                  return '>='
"=="                  return '=='
"*"                   return '*'
"/"                   return '/'
":"                   return ':'
";"                   return ';'
","                   return ','
"-"                   return '-'
"+"                   return '+'
"%"                   return '%'
"<"                   return '<'
">"                   return '>'
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
"new"                 return 'new'
"array"               return 'array'
"default"             return 'default'
"CharAt"              return 'charAt'
"toLowerCase"         return 'toLowerCase'
"toUpperCase"         return 'toUpperCase'
"Concat"              return 'Concat'
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
%left '**','*', '/', '%'
%left '++', '--'
%right '!'
%left UMENOS

%start INICIO

%%
INICIO : INSTRUCCIONES EOF {$$ = {C3D: new Tree($1.C3D)}
                                  return $$; }
                           ;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { $$ = {C3D: $1.C3D } ; $$.C3D.push($2.C3D); }
              | INSTRUCCION               { $$ = {C3D: [$1.C3D] }}
              ;

INSTRUCCION : FUNCTION          {$$ = { C3D:$1.C3D }}
            | CALLFUNCTION      {$$ = { C3D:$1.C3D }}
            | PRINT             {$$ = { C3D:$1.C3D }}
            | GRAPH             {$$ = { C3D:$1.C3D }}
            | IF                {$$ = { C3D:$1.C3D }}
            | TERNARIO          {$$ = { C3D:$1.C3D }}
            | WHILE             {$$ = { C3D:$1.C3D }}
            | DO                {$$ = { C3D:$1.C3D }}
            | FOR               {$$ = { C3D:$1.C3D }}
            | SWITCH            {$$ = { C3D:$1.C3D }}
            | DECLARACION       {$$ = { C3D:$1.C3D }}
            | ASIGNACION        {$$ = { C3D:$1.C3D }}
            | 'continue' ';'    {$$ = { C3D:new ContinueNode(this._$.first_line, this._$.first_column)      }}
            | 'break' ';'       {$$ = { C3D:new BreakNode(this._$.first_line, this._$.first_column)         }}
            | 'return' ';'      {$$ = { C3D:new ReturnNode(null,this._$.first_line, this._$.first_column)   }}
            | 'return' EXP ';'  {$$ = { C3D:new ReturnNode($2.C3D,this._$.first_line, this._$.first_column) }}
            | error             {$$ = { C3D: new ErrorNode( new ExceptionST(  typesError.SINTACTICO,
                                          "Instrucción no reconocida "+ $1 	+ " - " ,
                                      "[" + this._$.first_line +"," + this._$.first_column + "]"))          }}
            ;

FUNCTION :   'function' identifier '(' ')' '{'  INSTRUCCIONES '}' {$$ = { C3D: new FunctionNode (new Type(types.VOID),$2, $6.C3D,this._$.first_line, this._$.first_column,[])}}
           | 'function' identifier '(' ')' ':' TIPO '{' INSTRUCCIONES '}' { C3D: new FunctionNode ($7.C3D,$2, $6.C3D,this._$.first_line, this._$.first_column,[])}}
           | 'function' identifier '(' LP ')' ':' TIPO '{' INSTRUCCIONES '}' { $$ = { C3D: new FunctionNode( $7.C3D, $2, $9.C3D, this._$.first_line, this._$.first_column,$4.C3D) }}
         ;

LP: LP ',' identifier ':' TIPO { $$={ C3D: $1.C3D} ; $$.C3D.push(new ParamNode( $5.C3D,  $3, this._$.first_line, this._$.first_column));  }
        |  identifier ':' TIPO { $$ ={ C3D: [new ParamNode( $3.C3D,  $1, this._$.first_line, this._$.first_column)] } }
    ;

CALLFUNCTION: identifier '(' ')' ';'  {  $$ ={ C3D: new CallNode($1, this._$.first_line, this._$.first_column)}}
            ;

//'TIPOF' identifier ':' TIPO';'                                        {$$ = { C3D: new DeclareNode($4.C3D.type, $2, '',this._$.first_line, this._$.first_column,$1.C3D) }}
DECLARACION : 'TIPOF' identifier ':' TIPO '=' EXP ';'                               {$$ = { C3D: new DeclareNode($4.C3D, $2, $6.C3D, this._$.first_line, this._$.first_column, $1.C3D) }}
            | 'TIPOF' identifier ':' TIPO '[' ']' '=' '[' LE ']' ';'                {$$ = { C3D: new DeclareArrayNode( $4.C3D.type, $2, $9.C3D, this._$.first_line, this._$.first_column, $1.C3D ) } }
            | 'TIPOF' identifier ':' TIPO '[' ']' '=' 'new' 'array' '(' EXP ')' ';' {$$ = { C3D: new DeclareArrayNode( $4.C3D.type, $2,[$7.C3D] ,this._$.first_line, this._$.first_column, $1.C3D)  }}
            | 'type' identifier '=' '{' LP '}' ';'                                  {$$ = { C3D: new TypesNode( $2, $5.C3D,  this._$.first_line, this._$.first_column) }}
            ;

LE : LE ',' EXP  { $$ = {C3D: $1.C3D } ; $$.C3D.push($3.C3D); }
   | EXP {$$ = { C3D: [$1.C3D] }}
   ;

ASIGNACION : identifier '=' EXP ';' {$$ = { C3D: new AsigNode($1, $3.C3D, this._$.first_line, this._$.first_column) }}
           ;

TIPOF : 'let'   {$$ ={ C3D: false }}
      | 'const' {$$ ={ C3D: true  }}
      ;

TIPO : 'number'  {$$ = { C3D: new Type(types.NUMBER)  }}
     | 'string'  {$$ = { C3D: new Type(types.STRING)  }}
     | 'boolean' {$$ = { C3D: new Type(types.BOOLEAN) }}
     | 'types'   {$$ = { C3D: new TYPE(types.TYPE)    }}
     ;

PRINT : 'console.log' '(' LE ')' ';' { $$ = { C3D: new PrintNode($3.C3D, this._$.first_line, this._$.first_column) }}
      ;


GRAPH : 'graficar_ts' '('  ')' ';' { $$ = { C3D: new GraphNode(this._$.first_line, this._$.first_column)  }}
      ;

IF : 'if' CONDICION BLOQUE_INSTRUCCIONES                              {$$ = { C3D: new IfNode($2.C3D, $3.C3D, [], this._$.first_line, this._$.first_column)       }}
   | 'if' CONDICION BLOQUE_INSTRUCCIONES 'else' BLOQUE_INSTRUCCIONES  {$$ = { C3D: new IfNode($2.C3D, $3.C3D, $5.C3D, this._$.first_line, this._$.first_column)   }}
   | 'if' CONDICION BLOQUE_INSTRUCCIONES 'else' IF                    {$$ = { C3D: new IfNode($2.C3D, $4.C3D, [$5].C3D, this._$.first_line, this._$.first_column) }}
   ;


//TERNARIO
TERNARIO  : CONDICION '?' EXP ':' EXP  {$$ ={C3D: new TernarioNode($1.C3D, $3.C3D, $5.C3D, this._$.first_line, this._$.first_column) }}
      ;

//SWITCH
SWITCH : 'switch' CONDICION '{' CASELIST '}' { $$ ={C3D: new SwitchNode( $2.C3D, $4.C3D, this._$.first_line, this._$.first_column)  }}
      ;

CASELIST : CASELIST CASE {$$ = { C3D: $1.C3D } ; $$.C3D.push($2.C3D); }
        |CASE            {$$ = { C3D: [$1.C3D] }}
        ;

CASE : 'case' EXP ':' BLOQUE_INSTRUCCIONES_W {$$ = {C3D: new CaseNode ( $4.C3D, this._$.first_line, this._$.first_colum,$2.C3D) }}
     |  'default' ':' BLOQUE_INSTRUCCIONES_W {$$ = {C3D: new CaseNode ( $3.C3D, this._$.first_line, this._$.first_colum ) }}
     ;

//WHILE
WHILE : 'while' CONDICION BLOQUE_INSTRUCCIONES {$$ = { C3D: new WhileNode($2.C3D, $3.C3D, this._$.first_line, this._$.first_column) }}
      ;

//DO WHILE
DO :  'do' BLOQUE_INSTRUCCIONES 'while' CONDICION ';' {$$ = { C3D: new WhileNode($4.C3D, $2.C3D, this._$.first_line, this._$.first_column) }}
      ;

//FOR
FOR : 'for' '(' DECLARACION  EXP ';' EXP ')'  BLOQUE_INSTRUCCIONES {$$ = {C3D: new ForNode (  $3.C3D, $4.C3D, $6.C3D, $8.C3D ,  this._$.first_line, this._$.first_column ) }}
    | 'for' '(' TIPOF identifier IN  EXP ')'  BLOQUE_INSTRUCCIONES { $$ = { C3D: new ForInOfNode ( $4, $5.C3D, $6.C3D,  this._$.first_line, this._$.first_column  )}}
    ;

IN :  'in' {$$ ={ C3D: true  }}
   |  'of' {$$ ={ C3D: false  }}
   ;

BLOQUE_INSTRUCCIONES : '{' INSTRUCCIONES '}' {$$ = { C3D: $2.C3D }}
                     | '{' '}'               {$$ = { C3D:[] }}
                     ;

BLOQUE_INSTRUCCIONES_W :  INSTRUCCIONES  {$$ = { C3D: $1.C3D }}
                     //| '{' '}'               {$$ = { C3D:[] }}
                     ;

CONDICION : '(' EXP ')' {$$ = { C3D: $2.C3D  }}
                    ;

EXP : '-' EXP %prec UMENOS  { $$ = { C3D: new ArithNode($1.C3D, null, '-', this._$.first_line, this._$.first_column)          }}
          | EXP '+' EXP     { $$ = { C3D: new ArithNode($1.C3D, $3.C3D, '+', this._$.first_line, this._$.first_column)        }}
          | EXP '-' EXP     { $$ = { C3D: new ArithNode($1.C3D, $3.C3D, '-', this._$.first_line, this._$.first_column)        }}
          | EXP '*' EXP     { $$ = { C3D: new ArithNode($1.C3D, $3.C3D, '*', this._$.first_line, this._$.first_column)        }}
          | EXP '/' EXP     { $$ = { C3D: new ArithNode($1.C3D, $3.C3D, '/', this._$.first_line, this._$.first_column)        }}
          | EXP '%' EXP     { $$ = { C3D: new ArithNode($1.C3D, $3.C3D, '%', this._$.first_line, this._$.first_column)        }}
          | EXP '**' EXP    { $$ = { C3D: new ArithNode($1.C3D, $3.C3D, '**', this._$.first_line, this._$.first_column)       }}
          | EXP '++'        { $$ = { C3D: new ArithNode($1.C3D, null, '++',this._$.first_line, this._$.first_column)          }}
          | EXP '--'        { $$ = { C3D: new ArithNode($1.C3D, null, '--',this._$.first_line, this._$.first_column)          }}
          | EXP '<' EXP     { $$ = { C3D: new RelationalNode($1.C3D, $3.C3D, '<', this._$.first_line, this._$.first_column)   }}
          | EXP '>' EXP     { $$ = { C3D: new RelationalNode($1.C3D, $3.C3D, '>', this._$.first_line, this._$.first_column)   }}
          | EXP '>=' EXP    { $$ = { C3D: new RelationalNode($1.C3D, $3.C3D, '>=', this._$.first_line, this._$.first_column)  }}
          | EXP '<=' EXP    { $$ = { C3D: new RelationalNode($1.C3D, $3.C3D, '<=', this._$.first_line, this._$.first_column)  }}
          | EXP '==' EXP    { $$ = { C3D: new RelationalNode($1.C3D, $3.C3D, '==', this._$.first_line, this._$.first_column)  }}
          | EXP '!=' EXP    { $$ = { C3D: new RelationalNode($1.C3D, $3.C3D, '!=', this._$.first_line, this._$.first_column)  }}
          | EXP '||' EXP    { $$ = { C3D: new LogicNode($1.C3D, $3.C3D, '&&', this._$.first_line, this._$.first_column)       }}
          | EXP '&&' EXP    { $$ = { C3D: new LogicNode($1.C3D, $3.C3D, '||', this._$.first_line, this._$.first_column)       }}
          | '!' EXP         { $$ = { C3D: new LogicNode($2.C3D, null, '!', this._$.first_line, this._$.first_column)          }}
          | 'number'        { $$ = { C3D: new ValueNode(new Type(types.NUMBER), Number($1), this._$.first_line, this._$.first_column) }}
          | 'true'          { $$ = { C3D: new ValueNode(new Type(types.BOOLEAN), true, this._$.first_line, this._$.first_column)      }}
          | 'false'         { $$ = { C3D: new ValueNode(new Type(types.BOOLEAN), false, this._$.first_line, this._$.first_column)     }}
          | STRING_LITERAL  { $$ = { C3D: new ValueNode(new Type(types.STRING), $1.replace(/\"/g,"").replace(/\'/g,""), this._$.first_line, this._$.first_column)}}
          | identifier      { $$ = { C3D: new IdNode($1, this._$.first_line, this._$.first_column)}}
          | '(' EXP ')'     { $$ = { C3D: $2.C3D }}
          ;
