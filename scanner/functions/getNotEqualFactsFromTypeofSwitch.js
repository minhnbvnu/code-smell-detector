function getNotEqualFactsFromTypeofSwitch(start, end, witnesses) {
                let facts = 0 /* None */;
                for (let i = 0; i < witnesses.length; i++) {
                    const witness = i < start || i >= end ? witnesses[i] : void 0;
                    facts |= witness !== void 0 ? typeofNEFacts.get(witness) || 32768 /* TypeofNEHostObject */ : 0;
                }
                return facts;
            }