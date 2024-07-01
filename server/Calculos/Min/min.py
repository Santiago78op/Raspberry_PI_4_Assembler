import ctypes

# Cargar la librer�a compartida
lib = ctypes.CDLL('./libcalcular_minimo.so')

# Definir el prototipo de la funci�n
lib.calcular_minimo.argtypes = [ctypes.POINTER(ctypes.c_float), ctypes.c_int]
lib.calcular_minimo.restype = ctypes.c_float

# Definir el arreglo de n�meros
numbers = [1.6, 3.5, 3.4, 4.6]
num_elements = len(numbers)

# Convertir el arreglo a un tipo que ctypes pueda manejar
ArrayType = ctypes.c_float * num_elements
c_array = ArrayType(*numbers)

# Llamar a la funcion para calcular el m�nimo
min_value = lib.calcular_minimo(c_array, num_elements)
print(f"M�nimo: {min_value}")
