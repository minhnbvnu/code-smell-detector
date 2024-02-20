function registerCodeFix(reg) {
            for (const error of reg.errorCodes) {
                errorCodeToFixes.add(String(error), reg);
            }
            if (reg.fixIds) {
                for (const fixId51 of reg.fixIds) {
                    Debug.assert(!fixIdToRegistration.has(fixId51));
                    fixIdToRegistration.set(fixId51, reg);
                }
            }
        }