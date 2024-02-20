function reportCannotInvokePossiblyNullOrUndefinedError(node, facts) {
                error(node, facts & 16777216 /* IsUndefined */ ? facts & 33554432 /* IsNull */ ? Diagnostics.Cannot_invoke_an_object_which_is_possibly_null_or_undefined : Diagnostics.Cannot_invoke_an_object_which_is_possibly_undefined : Diagnostics.Cannot_invoke_an_object_which_is_possibly_null);
            }