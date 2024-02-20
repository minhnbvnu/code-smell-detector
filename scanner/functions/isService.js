async function isService(headers, cookie, body) {
        let detected = false;

        if (body === null) {
            return detected;
        }

        if (body.includes('PDB Console') === true) {
            detected = true;
        }
        return detected;
    }