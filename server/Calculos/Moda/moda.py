import ctypes

# Cargar la librer�a compartida
lib = ctypes.CDLL('./libcalcular_moda.so')  # Ajusta la ruta y nombre del archivo .so seg�n tu configuraci�n

# Definir el prototipo de la funci�n
lib.calcular_moda.argtypes = (ctypes.POINTER(ctypes.c_float), ctypes.c_int)
lib.calcular_moda.restype = ctypes.c_float  # La funci�n retorna el valor de la moda (float)

# Definir el arreglo de n�meros
numbers = [1.6, 3.5, 3.4, 4.6, 1.6, 3.5, 4.6, 4.6, 3.5]  # Ejemplo de datos con moda repetida

# Convertir el arreglo a un tipo que ctypes pueda manejar
ArrayType = ctypes.c_float * len(numbers)
c_array = ArrayType(*numbers)

num_elements = len(numbers)

# Llamar a la funci�n calcular_moda
mode_value = lib.calcular_moda(c_array, num_elements)

print(f"El valor moda del arreglo es: {mode_value}")
