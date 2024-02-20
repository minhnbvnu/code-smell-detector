function do_list(list, tw) {
        return List(list, function(node) {
            return node.transform(tw, true);
        });
    }