function collectDirectives(node, directives, attrs, maxPriority, ignoreDirective) {
      var nodeType = node.nodeType,
          attrsMap = attrs.$attr,
          match,
          className;

      switch (nodeType) {
        case NODE_TYPE_ELEMENT: /* Element */
          // use the node name: <directive>
          addDirective(directives,
              directiveNormalize(nodeName_(node)), 'E', maxPriority, ignoreDirective);

          // iterate over the attributes
          for (var attr, name, nName, ngAttrName, value, isNgAttr, nAttrs = node.attributes,
                   j = 0, jj = nAttrs && nAttrs.length; j < jj; j++) {
            var attrStartName = false;
            var attrEndName = false;

            attr = nAttrs[j];
            name = attr.name;
            value = trim(attr.value);

            // support ngAttr attribute binding
            ngAttrName = directiveNormalize(name);
            if (isNgAttr = NG_ATTR_BINDING.test(ngAttrName)) {
              name = name.replace(PREFIX_REGEXP, '')
                .substr(8).replace(/_(.)/g, function(match, letter) {
                  return letter.toUpperCase();
                });
            }

            var multiElementMatch = ngAttrName.match(MULTI_ELEMENT_DIR_RE);
            if (multiElementMatch && directiveIsMultiElement(multiElementMatch[1])) {
              attrStartName = name;
              attrEndName = name.substr(0, name.length - 5) + 'end';
              name = name.substr(0, name.length - 6);
            }

            nName = directiveNormalize(name.toLowerCase());
            attrsMap[nName] = name;
            if (isNgAttr || !attrs.hasOwnProperty(nName)) {
                attrs[nName] = value;
                if (getBooleanAttrName(node, nName)) {
                  attrs[nName] = true; // presence means true
                }
            }
            addAttrInterpolateDirective(node, directives, value, nName, isNgAttr);
            addDirective(directives, nName, 'A', maxPriority, ignoreDirective, attrStartName,
                          attrEndName);
          }

          // use class as directive
          className = node.className;
          if (isObject(className)) {
              // Maybe SVGAnimatedString
              className = className.animVal;
          }
          if (isString(className) && className !== '') {
            while (match = CLASS_DIRECTIVE_REGEXP.exec(className)) {
              nName = directiveNormalize(match[2]);
              if (addDirective(directives, nName, 'C', maxPriority, ignoreDirective)) {
                attrs[nName] = trim(match[3]);
              }
              className = className.substr(match.index + match[0].length);
            }
          }
          break;
        case NODE_TYPE_TEXT: /* Text Node */
          if (msie === 11) {
            // Workaround for #11781
            while (node.parentNode && node.nextSibling && node.nextSibling.nodeType === NODE_TYPE_TEXT) {
              node.nodeValue = node.nodeValue + node.nextSibling.nodeValue;
              node.parentNode.removeChild(node.nextSibling);
            }
          }
          addTextInterpolateDirective(directives, node.nodeValue);
          break;
        case NODE_TYPE_COMMENT: /* Comment */
          try {
            match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue);
            if (match) {
              nName = directiveNormalize(match[1]);
              if (addDirective(directives, nName, 'M', maxPriority, ignoreDirective)) {
                attrs[nName] = trim(match[2]);
              }
            }
          } catch (e) {
            // turns out that under some circumstances IE9 throws errors when one attempts to read
            // comment's node value.
            // Just ignore it and continue. (Can't seem to reproduce in test case.)
          }
          break;
      }

      directives.sort(byPriority);
      return directives;
    }