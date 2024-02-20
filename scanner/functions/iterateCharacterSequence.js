function* iterateCharacterSequence(nodes) {
        let seq = [];
        for (const node of nodes) {
            switch (node.type) {
                case "Character":
                    seq.push(node.value);
                    break;
                case "CharacterClassRange":
                    seq.push(node.min.value);
                    yield seq;
                    seq = [node.max.value];
                    break;
                case "CharacterSet":
                    if (seq.length > 0) {
                        yield seq;
                        seq = [];
                    }
                    break;
                // no default
            }
        }
        if (seq.length > 0) {
            yield seq;
        }
    }