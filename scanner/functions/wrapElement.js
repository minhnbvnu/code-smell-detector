function wrapElement(elt) {
    if(elt.tagName === "INPUT" && elt.type === "checkbox") {
      var converted = new p5.Element(elt);
      converted.checked = function(){
      if (arguments.length === 0){
        return this.elt.checked;
      } else if(arguments[0]) {
        this.elt.checked = true;
      } else {
        this.elt.checked = false;
      }
      return this;
      };
      return converted;
    } else if (elt.tagName === "VIDEO" || elt.tagName === "AUDIO") {
      return new p5.MediaElement(elt);
    } else {
      return new p5.Element(elt);
    }
  }