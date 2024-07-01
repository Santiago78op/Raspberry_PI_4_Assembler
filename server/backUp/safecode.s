.global sum_array

sum_array:
// x0 = puntero al arreglo, x1 = n?mero de elementos
    mov w2, #0        // Inicializar el ?ndice
    fmov s0, wzr      // Inicializar la suma a 0.0

loop:
    ldr s1, [x0, x2, lsl #2]  // Cargar el siguiente valor del arreglo en s1
    fadd s0, s0, s1           // s0 += s1
    add x2, x2, #1            // Incrementar el ?ndice
    cmp x2, x1                // Comparar el ?ndice con el n?mero de elementos
    b.lt loop                 // Si el ?ndice es menor, repetir el bucle

    // Convertir x1 (n?mero de elementos) a flotante en s1
    ucvtf s1, x1              // s1 = (float)x1
    fdiv s0, s0, s1           // s0 /= s1

    ret                       // Retornar el resultado en s0   

div_total:
    // Dividir la suma de los cuadrados por el número de elementos
   fdiv s2, s2, s1           // s2 /= s1
   // Calcular la raiz cuadrada del resultado
   fsqrt s5, s2              // s0 = sqrt(s2)
   fmov  s0, s2             // s0 = s5