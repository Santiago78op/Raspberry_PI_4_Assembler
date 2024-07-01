conteo1:
    // Los primeros dos argumentos (el arreglo y su longitud) se pasan en los registros x0 y x1
    // Inicializar d0 (que usaremos para la suma) a 0
    mov w2, #0
    

    // Crear un bucle que recorra el arreglo
    contador_loop:
        //Si x1 (la longitud del arreglo) es 0, hemos terminado
        cbz x1, fin

        // Cargar el valor actual del arreglo en w3 y avanzar el puntero del arreglo
        ldr w3, [x0], #4

        // Comparar el valor actual del arreglo con 1
        add w2, w2, #1

        sub x1, x1, #1
        // Volver al inicio del bucle
        b contador_loop

    fin:
            // Mover el valor del contador a x0
        mov w0, w2
            // Retornar
        ret
