function configurableRotationDrawer(pattern, xyz, tScale) {
    let xScale = [1, 0.5, -1][xyz];
    let yScale = [1, 1, -0.5][xyz];
    return args => {
        GatePainting.paintBackground(args, Config.TIME_DEPENDENT_HIGHLIGHT_COLOR);
        GatePainting.paintOutline(args);
        let text = pattern;
        if (!args.isInToolbox) {
            text = text.split('f(t)').join(args.gate.param);
        }
        GatePainting.paintGateSymbol(args, text, pattern.indexOf('^') !== -1);
        GatePainting.paintGateButton(args);

        let isStable = args.gate.stableDuration() === Infinity;
        if ((!args.isInToolbox || args.isHighlighted) && !isStable) {
            let rads = tScale * parseTimeFormula(args.gate.param, args.stats.time*2-1, false) || 0;
            GatePainting.paintCycleState(args, rads, xScale, yScale);
        }
    };
}