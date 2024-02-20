function areFlagsEqual(flagsA, flagsB) {
                return [...flagsA].sort().join("") === [...flagsB].sort().join("");
            }