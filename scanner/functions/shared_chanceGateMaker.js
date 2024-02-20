function shared_chanceGateMaker(builder) {
    return builder.
        setSymbol("Chance").
        setTitle("Probability Display").
        setBlurb("Shows chances of outcomes if a measurement was performed.\n" +
            "Use controls to see conditional probabilities.").
        promiseHasNoNetEffectOnStateVector().
        setExtraDisableReasonFinder(args => args.isNested ? "can't\nnest\ndisplays\n(sorry)" : undefined);
}