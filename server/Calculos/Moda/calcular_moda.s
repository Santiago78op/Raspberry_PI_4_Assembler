.global calcular_moda

.text
calcular_moda:
    // Entradas:
    // x0 = puntero al arreglo de n�meros (float)
    // x1 = n�mero de elementos en el arreglo

    // Guardar el frame pointer y el link register
    stp x29, x30, [sp, #-16]!
    mov x29, sp

    // Inicializar variables
    mov x2, #0            // Variable para �ndice
    mov w3, #0            // Contador m�ximo de ocurrencias
    fmov s0, wzr          // Valor moda inicializado a 0.0

find_mode_loop:
    cmp x2, x1            // Comparar �ndice con el n�mero de elementos
    b.ge mode_found       // Si �ndice >= n�mero de elementos, salir del bucle

    ldr s1, [x0, x2, lsl #2]  // Cargar el siguiente valor del arreglo en s1 (float)
    mov x3, #0            // Inicializar contador de ocurrencias a 0

    // Contar ocurrencias del valor actual en s1
count_occurrences_loop:
    cmp x3, x1            // Comparar contador con n�mero de elementos
    b.ge increment_index  // Si contador >= n�mero de elementos, salir del bucle

    ldr s2, [x0, x3, lsl #2]  // Cargar el valor del arreglo en s2 (float)
    fcmp s1, s2           // Comparar valores
    b.ne next_element     // Si no son iguales, ir al siguiente elemento

    add w3, w3, #1        // Incrementar contador de ocurrencias
    b next_element        // Ir al siguiente elemento

next_element:
    add x3, x3, #1        // Incrementar �ndice
    b count_occurrences_loop

increment_index:
    cmp w3, w4            // Comparar contador actual con m�ximo encontrado
    b.le next_mode        // Si contador <= m�ximo encontrado, buscar siguiente moda

    // Actualizar el valor de la moda y el contador m�ximo
    mov w4, w3            // w4 = nuevo m�ximo de ocurrencias
    fmov s0, s1           // s0 = nuevo valor moda

next_mode:
    add x2, x2, #1        // Incrementar �ndice
    b find_mode_loop

mode_found:
    // Almacenar el valor moda en s0
    ldp x29, x30, [sp], #16
    ret
