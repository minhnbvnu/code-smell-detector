function parseTokenNodeJSDoc() {
                        const pos = getNodePos();
                        const kind = token();
                        nextTokenJSDoc();
                        return finishNode(factoryCreateToken(kind), pos);
                    }