import ctypes
import os

# Cargar la biblioteca compartida
lib = ctypes.CDLL(os.path.abspath("libcalculos.so"))

# Declarar los tipos de retorno y argumentos de las funciones ensamblador
lib.sum_three.restype = ctypes.c_int
lib.sum_three.argtypes = [ctypes.c_int, ctypes.c_int, ctypes.c_int]

lib.subtract_three.restype = ctypes.c_int
lib.subtract_three.argtypes = [ctypes.c_int, ctypes.c_int, ctypes.c_int]

lib.multiply_three.restype = ctypes.c_int
lib.multiply_three.argtypes = [ctypes.c_int, ctypes.c_int, ctypes.c_int]

def main():
    while True:
        print("Seleccione la operacion:")
        print("1. Sumar tres numeros")
        print("2. Restar tres numeros")
        print("3. Multiplicar tres numeros")
        print("4. Salir")

        choice = input("Ingrese su eleccion (1/2/3/4): ")

        if choice == '4':
            print("Saliendo...")
            break

        if choice not in ['1', '2', '3']:
            print("Opcion invalida. Intente de nuevo.")
            continue

        try:
            num1 = int(input("Ingrese el primer numero: "))
            num2 = int(input("Ingrese el segundo numero: "))
            num3 = int(input("Ingrese el tercer numero: "))
        except ValueError:
            print("Por favor, ingrese nomeros validos.")
            continue

        if choice == '1':
            result = lib.sum_three(num1, num2, num3)
            print(f"Resultado de la suma: {result}")
        elif choice == '2':
            result = lib.subtract_three(num1, num2, num3)
            print(f"Resultado de la resta: {result}")
        elif choice == '3':
            result = lib.multiply_three(num1, num2, num3)
            print(f"Resultado de la multiplicacion: {result}")

if __name__ == "__main__":
    main()
