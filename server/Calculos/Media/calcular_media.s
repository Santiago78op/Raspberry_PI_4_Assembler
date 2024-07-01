.global calcular_media

calcular_media:
    // x0 = puntero al arreglo, x1 = n�mero de elementos
    mov x2, #0                    // Inicializar el �ndice a 0
    fmov s0, wzr                  // Inicializar la suma a 0.0

    // Calcular la suma de todos los elementos del arreglo
loop_sum:
    cmp x2, x1                    // Comparar el �ndice con el n�mero de elementos
    b.ge calculate_mean          // Si el �ndice es mayor o igual, calcular la media

    ldr s1, [x0, x2, lsl #2]      // Cargar el elemento actual del arreglo en s1
    fadd s0, s0, s1              // s0 += s1

    add x2, x2, #1                // Incrementar el �ndice
    b loop_sum                    // Repetir el bucle

calculate_mean:
    // Convertir x1 (n�mero de elementos) a flotante en s1
    ucvtf s1, x1                  // s1 = (float)x1

    // Dividir la suma por el n�mero de elementos para obtener la media
    fdiv s0, s0, s1               // s0 /= s1

    // Retornar el resultado de la media en s0
    ret
