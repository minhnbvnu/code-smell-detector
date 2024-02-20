function tryGiveBetterPrimaryError(errNode, maybeMissingAwait, leftStr, rightStr) {
                    switch (operatorToken.kind) {
                        case 36 /* EqualsEqualsEqualsToken */:
                        case 34 /* EqualsEqualsToken */:
                        case 37 /* ExclamationEqualsEqualsToken */:
                        case 35 /* ExclamationEqualsToken */:
                            return errorAndMaybeSuggestAwait(errNode, maybeMissingAwait, Diagnostics.This_comparison_appears_to_be_unintentional_because_the_types_0_and_1_have_no_overlap, leftStr, rightStr);
                        default:
                            return void 0;
                    }
                }