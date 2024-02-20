function _handleAttributes(oldNode, newNode, rule) {
    var attributes          = {},                         // fresh new set of attributes to set on newNode
        setClass            = rule.set_class,             // classes to set
        addClass            = rule.add_class,             // add classes based on existing attributes
        setAttributes       = rule.set_attributes,        // attributes to set on the current node
        checkAttributes     = rule.check_attributes,      // check/convert values of attributes
        allowedClasses      = currentRules.classes,
        i                   = 0,
        classes             = [],
        newClasses          = [],
        newUniqueClasses    = [],
        oldClasses          = [],
        classesLength,
        newClassesLength,
        currentClass,
        newClass,
        attributeName,
        newAttributeValue,
        method;
    
    if (setAttributes) {
      attributes = wysihtml5.lang.object(setAttributes).clone();
    }
    
    if (checkAttributes) {
      for (attributeName in checkAttributes) {
        method = attributeCheckMethods[checkAttributes[attributeName]];
        if (!method) {
          continue;
        }
        newAttributeValue = method(_getAttribute(oldNode, attributeName));
        if (typeof(newAttributeValue) === "string") {
          attributes[attributeName] = newAttributeValue;
        }
      }
    }
    
    if (setClass) {
      classes.push(setClass);
    }
    
    if (addClass) {
      for (attributeName in addClass) {
        method = addClassMethods[addClass[attributeName]];
        if (!method) {
          continue;
        }
        newClass = method(_getAttribute(oldNode, attributeName));
        if (typeof(newClass) === "string") {
          classes.push(newClass);
        }
      }
    }
    
    // make sure that wysihtml5 temp class doesn't get stripped out
    allowedClasses["_wysihtml5-temp-placeholder"] = 1;
    
    // add old classes last
    oldClasses = oldNode.getAttribute("class");
    if (oldClasses) {
      classes = classes.concat(oldClasses.split(WHITE_SPACE_REG_EXP));
    }
    classesLength = classes.length;
    for (; i<classesLength; i++) {
      currentClass = classes[i];
      if (allowedClasses[currentClass]) {
        newClasses.push(currentClass);
      }
    }
    
    // remove duplicate entries and preserve class specificity
    newClassesLength = newClasses.length;
    while (newClassesLength--) {
      currentClass = newClasses[newClassesLength];
      if (!wysihtml5.lang.array(newUniqueClasses).contains(currentClass)) {
        newUniqueClasses.unshift(currentClass);
      }
    }
    
    if (newUniqueClasses.length) {
      attributes["class"] = newUniqueClasses.join(" ");
    }
    
    // set attributes on newNode
    for (attributeName in attributes) {
      // Setting attributes can cause a js error in IE under certain circumstances
      // eg. on a <img> under https when it's new attribute value is non-https
      // TODO: Investigate this further and check for smarter handling
      try {
        newNode.setAttribute(attributeName, attributes[attributeName]);
      } catch(e) {}
    }
    
    // IE8 sometimes loses the width/height attributes when those are set before the "src"
    // so we make sure to set them again
    if (attributes.src) {
      if (typeof(attributes.width) !== "undefined") {
        newNode.setAttribute("width", attributes.width);
      }
      if (typeof(attributes.height) !== "undefined") {
        newNode.setAttribute("height", attributes.height);
      }
    }
  }