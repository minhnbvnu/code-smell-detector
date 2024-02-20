function parsePrivateIdentifier() {
                        const pos = getNodePos();
                        const node = factoryCreatePrivateIdentifier(internIdentifier(scanner2.getTokenValue()));
                        nextToken();
                        return finishNode(node, pos);
                    }