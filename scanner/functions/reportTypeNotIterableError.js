function reportTypeNotIterableError(errorNode, type, allowAsyncIterables) {
                const message = allowAsyncIterables ? Diagnostics.Type_0_must_have_a_Symbol_asyncIterator_method_that_returns_an_async_iterator : Diagnostics.Type_0_must_have_a_Symbol_iterator_method_that_returns_an_iterator;
                const suggestAwait = (
                // for (const x of Promise<...>) or [...Promise<...>]
                !!getAwaitedTypeOfPromise(type) || !allowAsyncIterables && isForOfStatement(errorNode.parent) && errorNode.parent.expression === errorNode && getGlobalAsyncIterableType(
                /** reportErrors */
                false) !== emptyGenericType && isTypeAssignableTo(type, getGlobalAsyncIterableType(
                /** reportErrors */
                false)));
                return errorAndMaybeSuggestAwait(errorNode, suggestAwait, message, typeToString(type));
            }