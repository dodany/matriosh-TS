#!/bin/bash
echo "Procesando grámatica ..."
rm ./src/parser/grammar.js
jison ./src/parser/grammar.jison
mv ./grammar.js ./src/parser/
echo "Gramática procesada."

