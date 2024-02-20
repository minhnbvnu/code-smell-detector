function drawConnectors(dv) {
    if (!dv.showDifferences) return;

    if (dv.svg) {
      clear(dv.svg);
      var w = dv.gap.offsetWidth;
      attrs(dv.svg, "width", w, "height", dv.gap.offsetHeight);
    }
    if (dv.copyButtons) clear(dv.copyButtons);

    var flip = dv.type == "left";
    var vpEdit = dv.edit.getViewport(), vpOrig = dv.orig.getViewport();
    var sTopEdit = dv.edit.getScrollInfo().top, sTopOrig = dv.orig.getScrollInfo().top;
    iterateChunks(dv.diff, function(topOrig, botOrig, topEdit, botEdit) {
      if (topEdit > vpEdit.to || botEdit < vpEdit.from ||
          topOrig > vpOrig.to || botOrig < vpOrig.from)
        return;
      var topLpx = dv.orig.heightAtLine(topOrig, "local") - sTopOrig, top = topLpx;
      if (dv.svg) {
        var topRpx = dv.edit.heightAtLine(topEdit, "local") - sTopEdit;
        if (flip) { var tmp = topLpx; topLpx = topRpx; topRpx = tmp; }
        var botLpx = dv.orig.heightAtLine(botOrig, "local") - sTopOrig;
        var botRpx = dv.edit.heightAtLine(botEdit, "local") - sTopEdit;
        if (flip) { var tmp = botLpx; botLpx = botRpx; botRpx = tmp; }
        var curveTop = " C " + w/2 + " " + topRpx + " " + w/2 + " " + topLpx + " " + (w + 2) + " " + topLpx;
        var curveBot = " C " + w/2 + " " + botLpx + " " + w/2 + " " + botRpx + " -1 " + botRpx;
        attrs(dv.svg.appendChild(document.createElementNS(svgNS, "path")),
              "d", "M -1 " + topRpx + curveTop + " L " + (w + 2) + " " + botLpx + curveBot + " z",
              "class", dv.classes.connect);
      }
      if (dv.copyButtons) {
        var copy = dv.copyButtons.appendChild(elt("div", dv.type == "left" ? "\u21dd" : "\u21dc",
                                                  "CodeMirror-merge-copy"));
        var editOriginals = dv.mv.options.allowEditingOriginals;
        copy.title = editOriginals ? "Push to left" : "Revert chunk";
        copy.chunk = {topEdit: topEdit, botEdit: botEdit, topOrig: topOrig, botOrig: botOrig};
        copy.style.top = top + "px";

        if (editOriginals) {
          var topReverse = dv.orig.heightAtLine(topEdit, "local") - sTopEdit;
          var copyReverse = dv.copyButtons.appendChild(elt("div", dv.type == "right" ? "\u21dd" : "\u21dc",
                                                           "CodeMirror-merge-copy-reverse"));
          copyReverse.title = "Push to right";
          copyReverse.chunk = {topEdit: topOrig, botEdit: botOrig, topOrig: topEdit, botOrig: botEdit};
          copyReverse.style.top = topReverse + "px";
          dv.type == "right" ? copyReverse.style.left = "2px" : copyReverse.style.right = "2px";
        }
      }
    });
  }