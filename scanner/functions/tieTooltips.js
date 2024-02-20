function tieTooltips()
{
  tModels.forEach(function(tModel, i) {
    tModel = extend({}, typeTooltipModel, tModel);

    if (!tModel.targetElements.length && tModel.targetSelector)
      tModel.targetElements = getElementsBySelector(tModel.targetSelector);

    if (!tModel.targetElements.length && tModel.targetXPath)
      tModel.targetElements = getElementsByXPath(tModel.targetXPath);

    tModel.targetElements.forEach(function(el) {
      el.addEventListener("mouseover", function() {
        var hoverTarget = this;

        if (activeElements.hovered === hoverTarget || activeElements.focused !== null)
          return;

        activeElements.hovered = hoverTarget;
        tt.target(this).model(tModel);

        setTimeout(function() {
          if (activeElements.hovered === hoverTarget)
            tt.showBrief();
        }, 300);
      });

      el.addEventListener("mouseout", function() {
        activeElements.hovered = null;

        if (activeElements.focused !== null)
          return;

        tt.hideAll();
      });

      el.addEventListener("focus", function() {
        if (["INPUT", "TEXTAREA"].indexOf(this.tagName) === -1 &&
          this.getAttribute("contenteditable") === null)
          return;

        activeElements.focused = this;

        tt.target(this).model(tModel);
        tt.showAll();
      });

      el.addEventListener("blur", function() {
        activeElements.focused = null;
        tt.hideAll();
      });
    });

    tModels[i] = tModel;
  });
}