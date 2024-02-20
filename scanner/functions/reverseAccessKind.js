function reverseAccessKind(a) {
            switch (a) {
                case 0 /* Read */:
                    return 1 /* Write */;
                case 1 /* Write */:
                    return 0 /* Read */;
                case 2 /* ReadWrite */:
                    return 2 /* ReadWrite */;
                default:
                    return Debug.assertNever(a);
            }
        }