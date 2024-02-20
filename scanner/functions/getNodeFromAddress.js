function getNodeFromAddress(startAddress) {
                        var current = me.body;
                        for(var i = 0;i < startAddress.length; i++) {
                            if(!current.childNodes) return null;
                            current = current.childNodes[startAddress[i]];
                        }
                        return current;
                    }