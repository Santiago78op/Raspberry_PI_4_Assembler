import ctypes

# Cargar la librer�a compartida
lib = ctypes.CDLL('./libcalcular_maximo.so')

# Definir el prototipo de la funci�n
lib.calcular_maximo.argtypes = [ctypes.POINTER(ctypes.c_float), ctypes.c_int]
lib.calcular_maximo.restype = ctypes.c_float

# Definir el arreglo de n�meros
numbers = [1.6, 3.5, 3.4, 4.6]
num_elements = len(numbers)

# Convertir el arreglo a un tipo que ctypes pueda manejar
ArrayType = ctypes.c_float * num_elements
c_array = ArrayType(*numbers)

# Llamar a la funci�n para calcular el m�ximo
max_value = lib.calcular_maximo(c_array, num_elements)
print(f"Maximo: {max_value}")
