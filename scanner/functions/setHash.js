function setHash(hash) {
       // It would be nice if we could use document.location.hash here,
       // but it's faulty sometimes.
       if (hash == '') hash = '#'
       document.location.hash = hash;
    }