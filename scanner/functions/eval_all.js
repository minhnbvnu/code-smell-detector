function eval_all(nodes, compressor, ignore_side_effects, cached, depth) {
            var values = [];
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                var value = node._eval(compressor, ignore_side_effects, cached, depth);
                if (node === value) return;
                values.push(value);
            }
            return values;
        }