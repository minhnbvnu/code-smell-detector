function getTrustedContext(node, attrNormalizedName) {
      if (attrNormalizedName == "srcdoc") {
        return $sce.HTML;
      }
      var tag = nodeName_(node);
      // maction[xlink:href] can source SVG.  It's not limited to <maction>.
      if (attrNormalizedName == "xlinkHref" ||
          (tag == "form" && attrNormalizedName == "action") ||
          (tag != "img" && (attrNormalizedName == "src" ||
                            attrNormalizedName == "ngSrc"))) {
        return $sce.RESOURCE_URL;
      }
    }