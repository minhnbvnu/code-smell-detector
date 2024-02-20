function getDescriptorUUID(descriptor) {
            // Check for string as enums also allow a reverse lookup which will match any numbers passed in
            if (typeof descriptor === 'string' && bluetoothDescriptors[descriptor]) {
                descriptor = bluetoothDescriptors[descriptor];
            }

            return getCanonicalUUID(descriptor);
        }