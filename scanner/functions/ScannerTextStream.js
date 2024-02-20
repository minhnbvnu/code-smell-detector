function ScannerTextStream(sourceText) {
            this.sourceText = sourceText;
            this.agg = new AggerateSourceTextSegment(ScannerTextStream.emptySegment, ScannerTextStream.emptySegment);
            this.len = this.sourceText.getLength();
        }