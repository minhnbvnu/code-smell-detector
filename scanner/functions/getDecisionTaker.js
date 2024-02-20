function getDecisionTaker(tst) {
                var decisionTaker = tst.locator[tst.alternation];
                if (typeof decisionTaker == "string" && decisionTaker.length > 0) {
                    decisionTaker = decisionTaker.split(",")[0];
                }
                return decisionTaker !== undefined ? decisionTaker.toString() : "";
            }