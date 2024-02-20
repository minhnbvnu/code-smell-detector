function getBodyKind(node) {
                if (astUtils.isLoop(node)) {
                    return "loop";
                }
                if (node.type === "SwitchStatement") {
                    return "switch";
                }
                return "other";
            }