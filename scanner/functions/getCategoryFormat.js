function getCategoryFormat(category) {
            switch (category) {
                case 1 /* Error */:
                    return "\x1B[91m" /* Red */;
                case 0 /* Warning */:
                    return "\x1B[93m" /* Yellow */;
                case 2 /* Suggestion */:
                    return Debug.fail("Should never get an Info diagnostic on the command line.");
                case 3 /* Message */:
                    return "\x1B[94m" /* Blue */;
            }
        }