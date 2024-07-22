#!/bin/bash

# Archivo temporal donde se guardará el contenido concatenado
output_file="temp.txt"

# Limpiar el archivo de salida si ya existe
> "$output_file"

# Iterar sobre todos los archivos .js en el directorio actual
for file in *.js; do
  echo "Procesando $file..."
  # Agregar el contenido del archivo al archivo de salida
  cat "$file" >> "$output_file"
  # Agregar separador
  echo -e "\n-------------------------\n" >> "$output_file"
done

echo "Archivos concatenados en $output_file"

# Abrir el archivo temporal con gedit
gedit "$output_file"

# Eliminar el archivo temporal después de cerrar gedit
rm "$output_file"

