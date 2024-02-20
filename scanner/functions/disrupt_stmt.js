function disrupt_stmt(s, f) {
        var x = stmt(s, f);
        x.disrupt = true;
    }