.global calcular_mediana

calcular_mediana:
    // x0 = puntero al arreglo, x1 = n�mero de elementos
    mov x2, x1                // Copiar el n�mero de elementos a x2 (se usar� como contador)
    lsr x2, x2, #1            // x2 = x1 / 2 (tama�o del subarreglo medio)

    // Ordenar el arreglo usando una funci�n de ordenamiento (omitiendo detalles aqu�)

    // Verificar si el tama�o del arreglo es impar
    tst x1, 1
    b.ne odd_case              // Si es impar, ir al caso impar

    // Caso par: calcular media de los dos elementos centrales
    sub x3, x2, #1             // x3 = x2 - 1 (�ndice del primer elemento central)
    ldr s0, [x0, x2, lsl #2]   // Cargar el primer elemento central en s0
    ldr s1, [x0, x3, lsl #2]   // Cargar el segundo elemento central en s1
    fadd s0, s0, s1            // s0 = s0 + s1
    fmov s1, #2.0              // Cargar 2.0 en s1
    fdiv s0, s0, s1            // s0 = s0 / 2.0
    ret

odd_case:
    // Caso impar: el elemento central es la mediana
    ldr s0, [x0, x2, lsl #2]   // Cargar el elemento central en s0
    ret
