function trim_default(trimmer, node) {
            node.value = node.value.transform(tt);
            var name = node.name.transform(trimmer);
            if (!name) {
                if (node.name instanceof AST_Destructured) return null;
                var value = node.value.drop_side_effect_free(compressor);
                if (!value) return null;
                log(node.name, "Side effects in default value of unused variable {name}");
                node.name.__unused = null;
                node.value = value;
            }
            return node;
        }