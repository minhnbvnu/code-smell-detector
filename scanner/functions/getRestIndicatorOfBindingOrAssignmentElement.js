function getRestIndicatorOfBindingOrAssignmentElement(bindingElement) {
            switch (bindingElement.kind) {
                case 166 /* Parameter */:
                case 205 /* BindingElement */:
                    return bindingElement.dotDotDotToken;
                case 227 /* SpreadElement */:
                case 301 /* SpreadAssignment */:
                    return bindingElement;
            }
            return void 0;
        }