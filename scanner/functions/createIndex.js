function createIndex(keys, docs, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
                        const myIndex = new FuseIndex({ getFn, fieldNormWeight });
                        myIndex.setKeys(keys.map(createKey));
                        myIndex.setSources(docs);
                        myIndex.create();
                        return myIndex;
                    }