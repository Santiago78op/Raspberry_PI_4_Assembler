import ctypes

# Cargar la librer�a compartida
lib = ctypes.CDLL('./mediana.so')
# Definir el prototipo de la funci�n
lib.calcular_mediana.argtypes = [ctypes.POINTER(ctypes.c_double), ctypes.c_int]
lib.calcular_mediana.restype = ctypes.c_double

# Definir el arreglo de n�meros y el tama�o
numbers = [1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5]
num_elements = len(numbers)

# Convertir el arreglo a un tipo que ctypes pueda manejar
c_array = (ctypes.c_double * num_elements)(*numbers)

# Convertir el tama�o a un tipo que ctypes pueda manejar
c_size = ctypes.c_int(num_elements)

# Llamar a la funci�n y obtener la mediana
result = lib.calcular_mediana(c_array, c_size)
print(f"La mediana es: {result}")