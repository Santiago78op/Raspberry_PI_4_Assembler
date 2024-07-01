
.global desviacion, conteo1, conteo0

desviacion:
// x0 = puntero al arreglo, x1 = n?mero de elementos
    mov w2, #0                // Inicializar el ?ndice
    fmov s0, wzr              // Inicializar la suma a 0.0
    fmov s2, wzr      // Inicializar la suma de los cuadrados a 0.0 (s2 para precisi�n simple)

loop:
    ldr s1, [x0, x2, lsl #2]  // Cargar el siguiente valor del arreglo en s1
    fadd s0, s0, s1           // s0 += s1
    add x2, x2, #1            // Incrementar el ?ndice
    cmp x2, x1                // Comparar el ?ndice con el n?mero de elementos
    b.lt loop                 // Si el ?ndice es menor, repetir el bucle

    // Convertir x1 (n?mero de elementos) a flotante en s1
    ucvtf s1, x1              // s1 = (float)x1
    fdiv s0, s0, s1           // s0 /= s1

// Calcular la suma de los cuadrados de las diferencias
    mov w2, #0                // Reiniciar el �ndice
loop_square:
    ldr s3, [x0, x2, lsl #2]  // Cargar el siguiente valor del arreglo en s3
    fsub s4, s3, s0           // s4 = s3 - s0
    fabs s4, s4               // Valor absoluto de s4
    fmul s4, s4, s4           // s4 = s4 * s4 (elevar al cuadrado)
    fadd s2, s2, s4           // Sumar al acumulador de cuadrados
    add x2, x2, #1            // Incrementar el �ndice
    cmp x2, x1                // Comparar el �ndice con el n�mero de elementos
    b.lt loop_square          // Si el �ndice es menor, repetir el bucle de cuadrados

    // Dividir la suma de los cuadrados por el n�mero de elementos
    fdiv s2, s2, s1           // s2 /= s1

    // Calcular la ra�z cuadrada del resultado
    fsqrt s0, s2              // s0 = sqrt(s2)

    ret                       // Retornar el resultado en s0

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
        cmp w3, #1
        beq sum

        
        sub x1, x1, #1
        // Volver al inicio del bucle
        b contador_loop


    sum:
        add w2, w2, #1
        sub x1, x1, #1
        // Volver al inicio del bucle
        b contador_loop

    fin:
            // Mover el valor del contador a x0
        mov w0, w2
            // Retornar
        ret

conteo0:
    // Los primeros dos argumentos (el arreglo y su longitud) se pasan en los registros x0 y x1
    // Inicializar d0 (que usaremos para la suma) a 0
    mov w2, #0
    

    // Crear un bucle que recorra el arreglo
    contador_loop:
        //Si x1 (la longitud del arreglo) es 0, hemos terminado
        cbz x1, fin

        // Cargar el valor actual del arreglo en w3 y avanzar el puntero del arreglo
        ldr w3, [x0], #4

        // Comparar el valor actual del arreglo con 0
        cmp w3, #0
        beq sum

        
        sub x1, x1, #1
        // Volver al inicio del bucle
        b contador_loop


    sum:
        add w2, w2, #1
        sub x1, x1, #1
        // Volver al inicio del bucle
        b contador_loop

    fin:
            // Mover el valor del contador a x0
        mov w0, w2
            // Retornar
        ret