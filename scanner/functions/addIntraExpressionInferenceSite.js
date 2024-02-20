function addIntraExpressionInferenceSite(context, node, type) {
                var _a2;
                ((_a2 = context.intraExpressionInferenceSites) != null ? _a2 : context.intraExpressionInferenceSites = []).push({ node, type });
            }