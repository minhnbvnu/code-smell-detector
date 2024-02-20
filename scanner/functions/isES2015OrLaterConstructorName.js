function isES2015OrLaterConstructorName(n) {
                switch (n) {
                    case "Promise":
                    case "Symbol":
                    case "Map":
                    case "WeakMap":
                    case "Set":
                    case "WeakSet":
                        return true;
                }
                return false;
            }