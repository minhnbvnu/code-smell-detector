function produceTokenFunction(pConfig) {

    return function(pStream, pState) {
      if (pStream.match(wordRegexp(pConfig.brackets), true, true)) {
        return "bracket";
      }
      /* comments */
      if (!pState.inComment) {
        if (pStream.match(/\/\*[^\*\/]*/, true, true)) {
          pState.inComment = true;
          return "comment";
        }
        if (pStream.match(wordRegexp(pConfig.singlecomment), true, true)) {
          pStream.skipToEnd();
          return "comment";
        }
      }
      if (pState.inComment) {
        if (pStream.match(/[^\*\/]*\*\//, true, true))
          pState.inComment = false;
        else
          pStream.skipToEnd();
        return "comment";
      }
      /* strings */
      if (!pState.inString && pStream.match(/\"(\\\"|[^\"])*/, true, true)) {
        pState.inString = true;
        return "string";
      }
      if (pState.inString) {
        if (pStream.match(/[^\"]*\"/, true, true))
          pState.inString = false;
        else
          pStream.skipToEnd();
        return "string";
      }
      /* keywords & operators */
      if (!!pConfig.keywords && pStream.match(wordRegexpBoundary(pConfig.keywords), true, true))
        return "keyword";

      if (pStream.match(wordRegexpBoundary(pConfig.options), true, true))
        return "keyword";

      if (pStream.match(wordRegexpBoundary(pConfig.arcsWords), true, true))
        return "keyword";

      if (pStream.match(wordRegexp(pConfig.arcsOthers), true, true))
        return "keyword";

      if (!!pConfig.operators && pStream.match(wordRegexp(pConfig.operators), true, true))
        return "operator";

      if (!!pConfig.constants && pStream.match(wordRegexp(pConfig.constants), true, true))
        return "variable";

      /* attribute lists */
      if (!pConfig.inAttributeList && !!pConfig.attributes && pStream.match(/\[/, true, true)) {
        pConfig.inAttributeList = true;
        return "bracket";
      }
      if (pConfig.inAttributeList) {
        if (pConfig.attributes !== null && pStream.match(wordRegexpBoundary(pConfig.attributes), true, true)) {
          return "attribute";
        }
        if (pStream.match(/]/, true, true)) {
          pConfig.inAttributeList = false;
          return "bracket";
        }
      }

      pStream.next();
      return "base";
    };
  }