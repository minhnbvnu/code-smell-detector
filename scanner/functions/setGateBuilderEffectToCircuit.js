function setGateBuilderEffectToCircuit(builder, circuitDefinition) {
    return builder.
        setActualEffectToUpdateFunc(ctx => advanceStateWithCircuit(
            ctx,
            circuitDefinition.withDisabledReasonsForEmbeddedContext(ctx.row, ctx.customContextFromGates),
            false)).
        setKnownEffectToCircuit(circuitDefinition).
        setExtraDisableReasonFinder(args => {
            let def = circuitDefinition.withDisabledReasonsForEmbeddedContext(args.outerRow, args.context);
            for (let row = 0; row < def.numWires; row++) {
                for (let col = 0; col < def.columns.length; col++) {
                    let r = def.gateAtLocIsDisabledReason(col, row);
                    if (r !== undefined) {
                        return r;
                    }
                    if (def.gateInSlot(col, row) === Gates.Special.Measurement) {
                        return "hidden\nmeasure\nbroken";
                    }
                }
            }
            return undefined;
        });
}