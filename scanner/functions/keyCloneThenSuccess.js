function keyCloneThenSuccess (oldCn) { // We want to return the original key, so we don't need to accept an argument here
        Sca.encode(key, function (key) {
            key = Sca.decode(key);
            success(key, oldCn);
        });
    }