function isObjectBindingOrAssignmentElement(node) {
            switch (node.kind) {
                case 205 /* BindingElement */:
                case 299 /* PropertyAssignment */:
                case 300 /* ShorthandPropertyAssignment */:
                case 301 /* SpreadAssignment */:
                    return true;
            }
            return false;
        }