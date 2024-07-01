import ctypes

# Cargar la librer�a compartida
lib = ctypes.CDLL('./libcalcular_media.so')

# Definir el prototipo de la funci�n
lib.calcular_media.argtypes = [ctypes.POINTER(ctypes.c_float), ctypes.c_int]
lib.calcular_media.restype = ctypes.c_float

# Definir el arreglo de n�meros
numbers = [1.6, 3.5, 3.4, 4.6]
num_elements = len(numbers)

# Convertir el arreglo a un tipo que ctypes pueda manejar
ArrayType = ctypes.c_float * num_elements
c_array = ArrayType(*numbers)

# Llamar a la funci�n para calcular la media
mean_value = lib.calcular_media(c_array, num_elements)
print(f"Media: {mean_value}")
