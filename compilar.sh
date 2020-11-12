#!/bin/bash
echo "Procesando grámatica ..."

## Ejecución
rm ./src/parser/grammar.js
jison ./src/parser/grammar.jison
mv ./grammar.js ./src/parser/

##Árbol
rm ./src/parser/grammar_tree.js
jison ./src/parser/grammar_tree.jison
mv ./grammar_tree.js ./src/parser/

##C3D
rm ./src/parser/grammar_c3d.js
jison ./src/parser/grammar_c3d.jison
mv ./grammar_c3d.js ./src/parser/

echo "Gramática procesada."

