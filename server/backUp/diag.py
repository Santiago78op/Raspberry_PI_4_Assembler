import RPi.GPIO as GPIO
import time

# Configuraci�n de la Raspberry Pi
GPIO.setmode(GPIO.BCM)  # Usa el esquema BCM para la numeraci�n de los pines
DOUT_PIN = 11  # Pin GPIO al que est� conectado el DOUT del MQ135 (GPIO 17, pin f�sico 11)

# Configuraci�n del pin DOUT como entrada
GPIO.setup(DOUT_PIN, GPIO.IN)

def get_air_quality():
    """
    Lee el estado del pin DOUT del sensor MQ135 y devuelve 1 si la calidad del aire es buena,
    o 0 si la calidad del aire es mala.
    """
    air_quality = GPIO.input(DOUT_PIN)
    
    if air_quality == GPIO.HIGH:
        print("Calidad de aire buena")
        return 1  # La calidad del aire es buena
    else:
        print("Calidad de aire mala")
        return 0  # La calidad del aire es mala

try:
    while True:
        # Llamar a la funci�n get_air_quality y obtener el valor
        air_quality_status = get_air_quality()
        print("Nivel de calidad: " + str(air_quality_status))  # Puedes usar este valor seg�n sea necesario
        
        time.sleep(10)

except KeyboardInterrupt:
    print("Programa terminado.")

finally:
    # Limpiar la configuraci�n de los pines GPIO
    GPIO.cleanup()
