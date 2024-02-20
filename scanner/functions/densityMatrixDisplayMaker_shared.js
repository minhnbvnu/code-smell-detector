function densityMatrixDisplayMaker_shared(builder) {
    return builder.
        setSymbol("Density").
        setTitle("Density Matrix Display").
        setBlurb("Shows the density matrix of the local mixed state of some wires.\n" +
            "Use controls to see conditional states.").
        promiseHasNoNetEffectOnStateVector().
        setExtraDisableReasonFinder(args => args.isNested ? "can't\nnest\ndisplays\n(sorry)" : undefined);
}