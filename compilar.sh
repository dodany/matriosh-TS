#!/bin/bash
echo "Procesando grámatica ..."
jison ./src/parser/arith_arbol.jison
mv ./arith_arbol.js ./src/parser/
echo "Gramática procesada."

