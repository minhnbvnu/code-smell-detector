function getCharacteristicUUID(characteristic) {
            // Check for string as enums also allow a reverse lookup which will match any numbers passed in
            if (typeof characteristic === 'string' && bluetoothCharacteristics[characteristic]) {
                characteristic = bluetoothCharacteristics[characteristic];
            }

            return getCanonicalUUID(characteristic);
        }