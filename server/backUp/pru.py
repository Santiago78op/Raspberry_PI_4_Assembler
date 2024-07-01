import smbus
import time

# Direcci�n I2C del PCF8591
PCF8591_ADDRESS = 0x48

# Comando para leer el canal AO0 (anal�gico)
PCF8591_AO0 = 0x00

# Inicializar el bus I2C
bus = smbus.SMBus(1)  # Para Raspberry Pi 4, usualmente se usa bus 1

def read_ao0():
    # Leer el valor anal�gico del canal AO0
    bus.write_byte(PCF8591_ADDRESS, PCF8591_AO0)
    value = bus.read_byte(PCF8591_ADDRESS)  # Lectura dummy
    value = bus.read_byte(PCF8591_ADDRESS)
    return value

def main():
    while True:
        ao0_value = read_ao0()
        # Convertir el valor le�do a voltaje (si es necesario)
        voltage = ao0_value / 255.0 * 3.3  # Si la alimentaci�n es de 3.3V
        print(f"AO0 Value: {ao0_value}, Voltage: {voltage:.2f}V")
        time.sleep(1)

if __name__ == "__main__":
    main()
