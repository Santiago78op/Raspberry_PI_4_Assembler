import ctypes

# Cargar la librer�a compartida
lib = ctypes.CDLL('./libadd_floats.so')

# Definir el prototipo de la funci�n
lib.sum_array.argtypes = (ctypes.POINTER(ctypes.c_float), ctypes.c_int)
lib.sum_array.restype = ctypes.c_float

# Definir el arreglo de n�meros
numbers = [1.6, 3.5, 3.4, 4.6, 6.9]
num_elements = len(numbers)

# Convertir el arreglo a un tipo que ctypes pueda manejar
ArrayType = ctypes.c_float * num_elements
c_array = ArrayType(*numbers)

# Llamar a la funci�n y obtener el resultado
result = lib.sum_array(c_array, num_elements)
print(f"Resultado de la suma del arreglo: {result}")
