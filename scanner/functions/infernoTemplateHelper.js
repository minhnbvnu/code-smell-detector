function infernoTemplateHelper (root, rootElement, templateValues, templateParams, valueCounter, propRefs, name, val) {
    var valueName = "fragment.templateValues[" + valueCounter.index + "]";
    if (!propRefs) {
      switch (name) {
        case "class":
        case "className":
          templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.ATTR_CLASS;");
          break;
        case "id":
          templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.ATTR_ID;");
          break;
        case "value":
          templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.ATTR_VALUE;");
          break;
        case "width":
          templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.ATTR_WIDTH;");
          break;
        case "height":
          templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.ATTR_HEIGHT;");
          break;
        case "type":
          templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.ATTR_TYPE;");
          break;
        case "name":
          templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.ATTR_NAME;");
          break;
        case "href":
          templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.ATTR_HREF;");
          break;
        case "disabled":
          templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.ATTR_DISABLED;");
          break;
        case "checked":
          templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.ATTR_CHECKED;");
          break;
        case "selected":
          templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.ATTR_SELECTED;");
          break;
        case "label":
          templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.ATTR_LABEL;");
          break;
        case "style":
          templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.ATTR_STYLE;");
          break;
        case "placeholder":
          templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.ATTR_PLACEHOLDER;");
          break;
        default:
          templateParams.push("if(Inferno.Type.ATTR_OTHER." + name + " === undefined) { Inferno.Type.ATTR_OTHER." + name + " = '" + name + "'; }");
          templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.ATTR_OTHER." + name + ";");
          break;
      }
      templateParams.push("fragment.templateElements[" + valueCounter.index + "] = " + rootElement + ";");
    } else {
      templateParams.push("if(Inferno.Type.COMPONENT_PROPS." + name + " === undefined) { Inferno.Type.COMPONENT_PROPS." + name + " = '" + name + "'; }");
      templateParams.push("fragment.templateTypes[" + valueCounter.index + "] = Inferno.Type.COMPONENT_PROPS." + name + ";");
      propRefs.push("fragment.templateElements[" + valueCounter.index + "] = " + rootElement + ";");
    }

    templateValues.push(val);
    valueCounter.index++;
  }