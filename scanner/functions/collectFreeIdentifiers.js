function collectFreeIdentifiers(file) {
            const map2 = createMultiMap();
            forEachFreeIdentifier(file, (id) => map2.add(id.text, id));
            return map2;
        }