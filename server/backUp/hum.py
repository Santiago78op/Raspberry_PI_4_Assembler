
import time
import board
import adafruit_dht

# Inicializar el sensor DHT (por ejemplo, DHT22)
# Nota: Si usas DHT11, reemplaza adafruit_dht.DHT22 por adafruit_dht.DHT11
dht_device = adafruit_dht.DHT11(board.D4)  # Usa el pin GPIO4

while True:
    try:
        # Intentar leer la temperatura y la humedad
        temperature_c = dht_device.temperature
        humidity = dht_device.humidity

        # Imprimir los valores le�dos
        print(f"Temperatura: {temperature_c:.1f} �C")
        print(f"Humedad: {humidity:.1f} %")

    except RuntimeError as error:
        # Errores de lectura son comunes con los sensores DHT, simplemente intenta nuevamente
        print(f"Error al leer el sensor: {error.args[0]}")

    except Exception as error:
        dht_device.exit()
        raise error

    # Esperar antes de la pr�xima lectura
    time.sleep(2.0)
