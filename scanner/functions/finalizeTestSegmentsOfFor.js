function finalizeTestSegmentsOfFor(context, choiceContext, head) {
        if (!choiceContext.processed) {
            choiceContext.trueForkContext.add(head);
            choiceContext.falseForkContext.add(head);
            choiceContext.qqForkContext.add(head);
        }
        if (context.test !== true) {
            context.brokenForkContext.addAll(choiceContext.falseForkContext);
        }
        context.endOfTestSegments = choiceContext.trueForkContext.makeNext(0, -1);
    }