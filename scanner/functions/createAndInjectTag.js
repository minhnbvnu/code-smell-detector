function createAndInjectTag (tagObj) {
    if (!tagObj || tagObj.exists()) { return; }

    tag = createTag(tagObj);
    if (!tag) { return; }

    if (headScriptEl) {
      headScriptEl.parentNode.insertBefore(tag, headScriptEl);
    } else {
      headEl.appendChild(tag);
    }

    headTags.push(tag);
  }