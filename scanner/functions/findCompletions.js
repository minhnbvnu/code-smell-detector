function findCompletions(srv, query, file) {
    if (query.end == null) throw ternError("missing .query.end field");
    var fromPlugin = srv.signalReturnFirst("completion", file, query);
    if (fromPlugin) return fromPlugin;
    var wordStart = resolvePos(file, query.end),
        wordEnd = wordStart,
        text = file.text;

    while (wordStart && acorn.isIdentifierChar(text.charCodeAt(wordStart - 1))) --wordStart;

    if (query.expandWordForward !== false) while (wordEnd < text.length && acorn.isIdentifierChar(text.charCodeAt(wordEnd))) ++wordEnd;
    var word = text.slice(wordStart, wordEnd),
        completions = [],
        ignoreObj;
    if (query.caseInsensitive) word = word.toLowerCase();

    function gather(prop, obj, depth, addInfo) {
      // 'hasOwnProperty' and such are usually just noise, leave them
      // out when no prefix is provided.
      if ((objLit || query.omitObjectPrototype !== false) && obj == srv.cx.protos.Object && !word) return;
      if (query.filter !== false && word && (query.caseInsensitive ? prop.toLowerCase() : prop).indexOf(word) !== 0) return;
      if (ignoreObj && ignoreObj.props[prop]) return;
      var result = addCompletion(query, completions, prop, obj && obj.props[prop], depth);
      if (addInfo && result && typeof result != "string") addInfo(result);
    }

    var hookname, prop, objType, isKey;
    var exprAt = infer.findExpressionAround(file.ast, null, wordStart, file.scope);
    var memberExpr, objLit; // Decide whether this is an object property, either in a member
    // expression or an object literal.

    if (exprAt) {
      var exprNode = exprAt.node;
      if (query.inLiteral === false && exprNode.type === "Literal" && (typeof exprNode.value === 'string' || exprNode.regex)) return {
        start: outputPos(query, file, wordStart),
        end: outputPos(query, file, wordEnd),
        completions: []
      };

      if (exprNode.type == "MemberExpression" && exprNode.object.end < wordStart) {
        memberExpr = exprAt;
      } else if (isStringAround(exprNode, wordStart, wordEnd)) {
        var parent = infer.parentNode(exprNode, file.ast);
        if (parent.type == "MemberExpression" && parent.property == exprNode) memberExpr = {
          node: parent,
          state: exprAt.state
        };
      } else if (exprNode.type == "ObjectExpression") {
        var objProp = pointInProp(exprNode, wordEnd);

        if (objProp) {
          objLit = exprAt;
          prop = isKey = objProp.key.name || objProp.key.value;
        } else if (!word && !/:\s*$/.test(file.text.slice(0, wordStart))) {
          objLit = exprAt;
          prop = isKey = true;
        }
      }
    }

    if (objLit) {
      // Since we can't use the type of the literal itself to complete
      // its properties (it doesn't contain the information we need),
      // we have to try asking the surrounding expression for type info.
      objType = infer.typeFromContext(file.ast, objLit);
      ignoreObj = objLit.node.objType;
    } else if (memberExpr) {
      prop = memberExpr.node.property;
      prop = prop.type == "Literal" ? prop.value.slice(1) : prop.name;
      memberExpr.node = memberExpr.node.object;
      objType = infer.expressionType(memberExpr);
    } else if (text.charAt(wordStart - 1) == ".") {
      var pathStart = wordStart - 1;

      while (pathStart && (text.charAt(pathStart - 1) == "." || acorn.isIdentifierChar(text.charCodeAt(pathStart - 1)))) pathStart--;

      var path = text.slice(pathStart, wordStart - 1);

      if (path) {
        objType = infer.def.parsePath(path, file.scope).getObjType();
        prop = word;
      }
    }

    if (prop != null) {
      srv.cx.completingProperty = prop;
      if (objType) infer.forAllPropertiesOf(objType, gather);
      if (!completions.length && query.guess !== false && objType && objType.guessProperties) objType.guessProperties(function (p, o, d) {
        if (p != prop && p != "✖" && p != "<i>") gather(p, o, d);
      });
      if (!completions.length && word.length >= 2 && query.guess !== false) for (var prop in srv.cx.props) gather(prop, srv.cx.props[prop][0], 0);
      hookname = "memberCompletion";
    } else {
      infer.forAllLocalsAt(file.ast, wordStart, file.scope, gather);

      if (query.includeKeywords) {
        (srv.options.ecmaVersion >= 6 ? jsKeywordsES6 : jsKeywords).forEach(function (kw) {
          gather(kw, null, 0, function (rec) {
            rec.isKeyword = true;
          });
        });
      }

      hookname = "variableCompletion";
    }

    srv.signal(hookname, file, wordStart, wordEnd, gather);
    if (query.sort !== false) completions.sort(compareCompletions);
    srv.cx.completingProperty = null;
    return {
      start: outputPos(query, file, wordStart),
      end: outputPos(query, file, wordEnd),
      isProperty: !!prop,
      isObjectKey: !!isKey,
      completions: completions
    };
  }