function labeled_stmt(s, f) {
        var x = stmt(s, f);
        x.labeled = true;
    }