function isUnderscored(name) {
                const nameBody = name.replace(/^_+|_+$/gu, "");
                // if there's an underscore, it might be A_CONSTANT, which is okay
                return nameBody.includes("_") && nameBody !== nameBody.toUpperCase();
            }