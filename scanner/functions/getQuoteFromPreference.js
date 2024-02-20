function getQuoteFromPreference(qp) {
            switch (qp) {
                case 0 /* Single */:
                    return "'";
                case 1 /* Double */:
                    return '"';
                default:
                    return Debug.assertNever(qp);
            }
        }