function getServiceUUID(service) {
            // Check for string as enums also allow a reverse lookup which will match any numbers passed in
            if (typeof service === 'string' && bluetoothServices[service]) {
                service = bluetoothServices[service];
            }

            return getCanonicalUUID(service);
        }