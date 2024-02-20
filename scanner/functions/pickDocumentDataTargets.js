function pickDocumentDataTargets()
{
  var pickedElements = getElementsByAttribute("data-tooltip");

  pickedElements.forEach(function(elTarget) {
    var tm = {
      contentText: elTarget.getAttribute("data-tooltip"),
      targetElements: [elTarget]
    };

    if (elTarget.getAttribute("data-tooltip-animate-function") !== null)
      tm.animateFunction = elTarget.getAttribute("data-tooltip-animate-function");

    if (elTarget.getAttribute("data-tooltip-color") !== null)
      tm.color = elTarget.getAttribute("data-tooltip-color");

    if (elTarget.getAttribute("data-tooltip-more") !== null)
      tm.contentMore = elTarget.getAttribute("data-tooltip-more");

    if (elTarget.getAttribute("data-tooltip-stickto") !== null)
      tm.stickTo = elTarget.getAttribute("data-tooltip-stickto");

    if (elTarget.getAttribute("data-tooltip-maxwidth") !== null)
      tm.maxWidth = elTarget.getAttribute("data-tooltip-maxwidth");
      
    tModels.push(extend({}, typeTooltipModel, tm));
  });
}