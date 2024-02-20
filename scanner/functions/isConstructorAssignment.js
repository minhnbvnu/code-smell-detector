function isConstructorAssignment(x) {
            if (!x.name)
                return false;
            if (isIdentifier(x.name) && x.name.text === "constructor")
                return true;
            return false;
        }