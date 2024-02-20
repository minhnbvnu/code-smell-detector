function isEqualityOperatorKind(kind) {
            switch (kind) {
                case 36 /* EqualsEqualsEqualsToken */:
                case 34 /* EqualsEqualsToken */:
                case 37 /* ExclamationEqualsEqualsToken */:
                case 35 /* ExclamationEqualsToken */:
                    return true;
                default:
                    return false;
            }
        }