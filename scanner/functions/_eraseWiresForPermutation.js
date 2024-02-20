function _eraseWiresForPermutation(args) {
    for (let i = 0; i < args.gate.height; i++) {
        let y = _wireY(args, i);
        let p = new Point(args.rect.x, y);
        let c = new Point(args.rect.x + Config.GATE_RADIUS, y);
        let q = new Point(args.rect.right(), y);
        let loc = new Point(args.positionInCircuit.col, args.positionInCircuit.row + i);
        let isMeasured1 = args.stats.circuitDefinition.locIsMeasured(loc);
        let isMeasured2 = args.stats.circuitDefinition.locIsMeasured(loc.offsetBy(1, 0));

        for (let dy of isMeasured1 ? [-1, +1] : [0]) {
            args.painter.strokeLine(p.offsetBy(0, dy), c.offsetBy(1, dy), 'white');
        }
        for (let dy of isMeasured2 ? [-1, +1] : [0]) {
            args.painter.strokeLine(c.offsetBy(-1, dy), q.offsetBy(0, dy), 'white');
        }
    }
}