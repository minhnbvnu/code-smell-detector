function compareRelatedInformation(d1, d2) {
            if (!d1.relatedInformation && !d2.relatedInformation) {
                return 0 /* EqualTo */;
            }
            if (d1.relatedInformation && d2.relatedInformation) {
                return compareValues(d1.relatedInformation.length, d2.relatedInformation.length) || forEach(d1.relatedInformation, (d1i, index) => {
                    const d2i = d2.relatedInformation[index];
                    return compareDiagnostics(d1i, d2i);
                }) || 0 /* EqualTo */;
            }
            return d1.relatedInformation ? -1 /* LessThan */ : 1 /* GreaterThan */;
        }