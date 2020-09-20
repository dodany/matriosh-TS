#!/bin/bash
echo "Procesando grámatica ..."
jison ./src/parser/grammar.jison
mv ./grammar.js ./src/parser/
echo "Gramática procesada."

