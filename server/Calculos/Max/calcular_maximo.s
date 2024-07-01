.global calcular_maximo

calcular_maximo:
    // x0 = puntero al arreglo, x1 = n�mero de elementos
    mov x2, #1                    // Inicializar el �ndice a 1 (primer elemento ya cargado)
    ldr s0, [x0]                  // Cargar el primer elemento del arreglo en s0

    // Calcular el m�ximo
loop:
    cmp x2, x1                    // Comparar el �ndice con el n�mero de elementos
    b.ge loop_end                 // Si el �ndice es mayor o igual, salir del bucle

    ldr s1, [x0, x2, lsl #2]      // Cargar el elemento actual del arreglo en s1
    fcmp s1, s0                   // Comparar s1 con s0
    b.le continue_loop            // Si s1 <= s0, continuar con el siguiente elemento

    fmov s0, s1                    // Actualizar m�ximo con s1

continue_loop:
    add x2, x2, #1                // Incrementar el �ndice
    b loop                        // Repetir el bucle

loop_end:
    // Retornar el m�ximo en s0
    ret
