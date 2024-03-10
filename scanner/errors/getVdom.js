function getVdom(html, values) {
    var char = '';
    var lastChar = '';
    var i = 0;
    var n = 0;
    var root = null;
    var insideTag = false;
    var tagContent = '';
    var tagName = '';
    var vElement = null;
    var childText = '';
    var parent = null;
    var tagData = null;
    var skipAppend = false;
    var newChild = null;
    var hasRootNodeAlready = false;

    for (i = 0, n = html.length; i < n; i++) {
      //set the char to the current character in the string
      char = html[i];
      if (char === "<") {
        insideTag = true;
      } else if (char === ">" && insideTag === true) {
        //check if first character is a close tag
        if (tagContent[0] === "/") {
          //bad closing tag
          if (tagContent !== "/" + parent.tag && !selfClosingTags[parent.tag] && !parent.closed) {
            console.error("Template error: " + applyValues(html, values));
            throw new Error("Expected corresponding t7 closing tag for '" + parent.tag + "'.");
          }
          //when the childText is not empty
          if (childText.trim() !== "") {
            //escape quotes etc
            childText = replaceQuotes(childText);
            //check if childText contains one of our placeholders
            childText = handleChildTextPlaceholders(childText, parent, true);
            if (childText !== null && parent.children.length === 0) {
              parent.children = childText;
            } else if (childText != null) {
              parent.children.push(childText);
            }
          }
          //move back up the vDom tree
          parent = parent.parent;
          if (parent) {
            parent.closed = true;
          }
        } else {
          //check if we have any content in the childText, if so, it was a text node that needs to be added
          if (childText.trim().length > 0 && !(parent instanceof Array)) {
            //escape quotes etc
            childText = replaceQuotes(childText);
            //check the childtext for placeholders
            childText = handleChildTextPlaceholders(
              childText.replace(/(\r\n|\n|\r)/gm, ""),
              parent
            );
            parent.children.push(childText);
            childText = "";
          }
          //check if there any spaces in the tagContent, if not, we have our tagName
          if (tagContent.indexOf(" ") === -1) {
            tagData = {};
            tagName = tagContent;
          } else {
            //get the tag data via the getTagData function
            tagData = getTagData(tagContent);
            tagName = tagData.tag;
          }
          //now we create out vElement
          vElement = {
            tag: tagName,
            assignments: (tagData && tagData.assignments) ? tagData.assignments : null,
            children: [],
            closed: tagContent[tagContent.length - 1] === "/" || selfClosingTags[tagName] ? true : false
          };

          if (tagData && tagData.key) {
            vElement.key = tagData.key;
          }
          //push the node we've constructed to the relevant parent
          if (parent === null) {
            if (hasRootNodeAlready === true) {
              throw new Error("t7 templates must contain only a single root element");
            }
            hasRootNodeAlready = true;
            if (root === null && vElement.closed === false) {
              root = parent = vElement;
            } else {
              root = vElement;
            }
          } else if (parent instanceof Array) {
            parent.push(vElement);
          } else {
            parent.children.push(vElement);
          }
          if (!selfClosingTags[tagName] && vElement.closed === false) {
            //set our node's parent to our current parent
            if (parent === vElement) {
              vElement.parent = null;
            } else {
              vElement.parent = parent;
            }
            //now assign the parent to our new node
            parent = vElement;
          }
        }
        //reset our flags and strings
        insideTag = false;
        tagContent = '';
        childText = '';
      } else if (insideTag === true) {
        tagContent += char;
        lastChar = char;
      } else {
        childText += char;
        lastChar = char;
      }
    }
    //return the root (our constructed vDom)
    return root;
  }