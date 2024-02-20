function setSpecialAttr(element, attrName, value) {
      // Attributes names that do not start with letters (such as `(click)`) cannot be set using `setAttribute`
      // so we have to jump through some hoops to get such an attribute
      // https://github.com/angular/angular.js/pull/13318
      specialAttrHolder.innerHTML = "<span " + attrName + ">";
      var attributes = specialAttrHolder.firstChild.attributes;
      var attribute = attributes[0];
      // We have to remove the attribute from its container element before we can add it to the destination element
      attributes.removeNamedItem(attribute.name);
      attribute.value = value;
      element.attributes.setNamedItem(attribute);
    }