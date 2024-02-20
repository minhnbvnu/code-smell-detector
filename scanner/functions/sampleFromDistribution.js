function sampleFromDistribution(args) {
    let probabilities = args.customStats;
    let buf = probabilities.rawBuffer();
    let r = args.painter.rng.random();
    let n = probabilities.height();
    //noinspection ForLoopThatDoesntUseLoopVariableJS
    for (let i = 0; ; i++) {
        let p = buf[i*2];
        r -= p;
        if (i === n-1 || r < 0.00001) {
            return {i, p};
        }
    }
}