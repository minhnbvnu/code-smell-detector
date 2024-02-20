function makeWidget(cm, options, range) {
    var widget = getOption(cm, options, "widget");

    if (typeof widget == "function") {
      widget = widget(range.from, range.to);
    }

    if (typeof widget == "string") {
      var text = document.createTextNode(widget);
      widget = document.createElement("span");
      widget.appendChild(text);
      widget.className = "CodeMirror-foldmarker";
    } else if (widget) {
      widget = widget.cloneNode(true)
    }
    return widget;
  }