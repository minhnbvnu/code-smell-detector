function packageIdIsEqual(a, b) {
            return a === b || !!a && !!b && a.name === b.name && a.subModuleName === b.subModuleName && a.version === b.version;
        }