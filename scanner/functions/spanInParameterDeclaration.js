function spanInParameterDeclaration(parameter) {
                    if (isBindingPattern(parameter.name)) {
                        return spanInBindingPattern(parameter.name);
                    }
                    else if (canHaveSpanInParameterDeclaration(parameter)) {
                        return textSpan(parameter);
                    }
                    else {
                        const functionDeclaration = parameter.parent;
                        const indexOfParameter = functionDeclaration.parameters.indexOf(parameter);
                        Debug.assert(indexOfParameter !== -1);
                        if (indexOfParameter !== 0) {
                            return spanInParameterDeclaration(functionDeclaration.parameters[indexOfParameter - 1]);
                        }
                        else {
                            return spanInNode(functionDeclaration.body);
                        }
                    }
                }