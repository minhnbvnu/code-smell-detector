function ApexMode() {
    TextMode.call(this);

    this.HighlightRules = ApexHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = new CstyleBehaviour();
}