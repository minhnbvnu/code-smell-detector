function buildInfernoTemplate(root, valueCounter, parentNodeName, templateValues, templateParams, component) {
    //TODO this entire function is horrible, needs a revist and refactor
    var nodeName = parentNodeName ? parentNodeName + "_" : "n_";
    var child = null,
      matches, valueName = "";

    if (root.children instanceof Array) {
      for (var i = 0; i < root.children.length; i++) {
        child = root.children[i];
        if (typeof child === "string" && root.children.length === 1) {
          matches = child.match(/__\$props__\[\d*\]/g);
          if (matches === null) {
            if (!parentNodeName) {
              templateParams.push("root.textContent=('" + child + "');");
            } else {
              templateParams.push(parentNodeName + ".textContent='" + child + "';");
            }
          } else {
            valueName = "fragment.templateValues[" + valueCounter.index + "]";
            templateParams.push("if(typeof " + valueName + " !== 'object') {");
            if (!parentNodeName) {
              templateParams.push("root.textContent=" + valueName + ";");
            } else {
              templateParams.push(parentNodeName + ".textContent=(" + valueName + " === '' ? ' ' : " + valueName + ");");
            }
            templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.TEXT;");
            templateParams.push("} else {");
            templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = (" + valueName + ".constructor === Array ? Inferno.Type.LIST : Inferno.Type.FRAGMENT);");
            templateParams.push("}");
            if (!parentNodeName) {
              templateParams.push("fragment.templateElements[" + valueCounter.index + "] = root;");
            } else {
              templateParams.push("fragment.templateElements[" + valueCounter.index + "] = " + parentNodeName + ";");
            }
            templateValues.push(child);
            valueCounter.index++;
          }
        } else if (typeof child === "string" && root.children.length > 1) {
          matches = child.match(/__\$props__\[\d*\]/g);
          if (matches === null) {
            templateParams.push("var " + nodeName + i + " = Inferno.dom.createText('" + child.replace(/(\r\n|\n|\r)/gm, "") + "');");
          } else {
            valueName = "fragment.templateValues[" + valueCounter.index + "]";
            templateParams.push("var " + nodeName + i + ";");
            templateParams.push("if(typeof " + valueName + " !== 'object') {");
            templateParams.push(nodeName + i + " = Inferno.dom.createText(" + valueName + ");");
            templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.TEXT_DIRECT;");
            templateParams.push("} else {");
            templateParams.push(nodeName + i + " = Inferno.dom.createEmpty();");
            templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = (" + valueName + ".constructor === Array ? Inferno.Type.LIST_REPLACE : Inferno.Type.FRAGMENT_REPLACE);");
            templateParams.push("}");
            templateParams.push("fragment.templateElements[" + valueCounter.index + "] = " + nodeName + i + ";");
            templateValues.push(child);
            valueCounter.index++;
          }
          if (!parentNodeName) {
            templateParams.push("root.appendChild(" + nodeName + i + ");");
          } else {
            templateParams.push(parentNodeName + ".appendChild(" + nodeName + i + ");");
          }
        } else if (child != null) {
          if (child.tag) {
            if (isComponentName(child.tag) === true) {
              valueCounter.t7Required = true;
              var props = [];
              var propRefs = [];
              var childHelper = infernoTemplateHelper.bind(null, child, nodeName + i, templateValues, templateParams, valueCounter, propRefs);
              var childAttrs = joinAttrs(child.assignments, childHelper);
              templateParams.push("var " + nodeName + i + " = Inferno.dom.createComponent(" + (!parentNodeName ? "root" : parentNodeName) + ", t7.loadComponent('" + child.tag + "'), " + childAttrs + ");");
              templateParams.push(propRefs.join(""));
            } else {
              templateParams.push("var " + nodeName + i + " = Inferno.dom.createElement('" + child.tag + "');");
              if (child.assignments) {
                var infernoHelper = infernoTemplateHelper.bind(null, child, nodeName + i, templateValues, templateParams, valueCounter, null);
                templateParams.push("Inferno.dom.addAttributes(" + nodeName + i + ", " + joinAttrs(root.assignments, infernoHelper) + ");");
              }
              if (child.children) {
                buildInfernoTemplate(child, valueCounter, nodeName + i, templateValues, templateParams, component);
              }
              if (!parentNodeName) {
                templateParams.push("root.appendChild(" + nodeName + i + ");");
              } else {
                templateParams.push(parentNodeName + ".appendChild(" + nodeName + i + ");");
              }
            }
          }
        }
      }
    }
  }