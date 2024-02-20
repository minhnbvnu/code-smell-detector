function isReferencedFile(reason) {
            switch (reason == null ? void 0 : reason.kind) {
                case 3 /* Import */:
                case 4 /* ReferenceFile */:
                case 5 /* TypeReferenceDirective */:
                case 7 /* LibReferenceDirective */:
                    return true;
                default:
                    return false;
            }
        }