function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}