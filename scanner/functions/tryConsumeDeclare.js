function tryConsumeDeclare() {
                let token = scanner.getToken();
                if (token === 136 /* DeclareKeyword */) {
                    token = nextToken();
                    if (token === 142 /* ModuleKeyword */) {
                        token = nextToken();
                        if (token === 10 /* StringLiteral */) {
                            recordAmbientExternalModule();
                        }
                    }
                    return true;
                }
                return false;
            }