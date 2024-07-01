import ctypes

# Cargar la librer�a compartida
lib = ctypes.CDLL('./desEstandar.so')

# Definir el prototipo de la funci�n
lib.desEstandar.argtypes = (ctypes.POINTER(ctypes.c_float), ctypes.c_int)
lib.desEstandar.restype = ctypes.c_float

# Definir el arreglo de n�meros
numbers = [1.6, 3.5, 3.4, 4.6]
num_elements = len(numbers)

# Convertir el arreglo a un tipo que ctypes pueda manejar
ArrayType = ctypes.c_float * num_elements
c_array = ArrayType(*numbers)

# Llamar a la funci�n y obtener el resultado de la suma de los cuadrados
result = lib.desEstandar(c_array, num_elements)
print(f"Resultado de la suma de los cuadrados de las diferencias: {result}")