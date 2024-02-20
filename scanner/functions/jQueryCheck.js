function jQueryCheck(context, jqCandidate) {
        if (!context.jQuery) {
            var $ = jqCandidate || (typeof jQuery !== "undefined" ? jQuery : null);
            if ($ && "readyWait" in $) {
                context.jQuery = $;

                //Manually create a "jquery" module entry if not one already
                //or in process.
                if (!context.defined.jquery && !context.jQueryDef) {
                    context.defined.jquery = $;
                }

                //Make sure
                if (context.scriptCount) {
                    $.readyWait += 1;
                    context.jQueryIncremented = true;
                }
            }
        }
    }