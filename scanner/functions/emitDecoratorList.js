function emitDecoratorList(parentNode, decorators) {
                emitList(parentNode, decorators, 2146305 /* Decorators */);
                const lastDecorator = lastOrUndefined(decorators);
                return lastDecorator && !positionIsSynthesized(lastDecorator.end) ? lastDecorator.end : parentNode.pos;
            }