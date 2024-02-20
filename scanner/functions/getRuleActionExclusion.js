function getRuleActionExclusion(ruleAction) {
            let mask2 = 0 /* None */;
            if (ruleAction & 1 /* StopProcessingSpaceActions */) {
                mask2 |= 28 /* ModifySpaceAction */;
            }
            if (ruleAction & 2 /* StopProcessingTokenActions */) {
                mask2 |= 96 /* ModifyTokenAction */;
            }
            if (ruleAction & 28 /* ModifySpaceAction */) {
                mask2 |= 28 /* ModifySpaceAction */;
            }
            if (ruleAction & 96 /* ModifyTokenAction */) {
                mask2 |= 96 /* ModifyTokenAction */;
            }
            return mask2;
        }