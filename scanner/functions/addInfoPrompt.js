function addInfoPrompt(elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].innerHTML =
      "<p>To switch between the interactive traceback and the plaintext " +
      'one, you can click on the "Traceback" headline. From the text ' +
      "traceback you can also create a paste of it. " +
      (!EVALEX
        ? ""
        : "For code execution mouse-over the frame you want to debug and " +
          "click on the console icon on the right side." +
          "<p>You can execute arbitrary Python code in the stack frames and " +
          "there are some extra helpers available for introspection:" +
          "<ul><li><code>dump()</code> shows all variables in the frame" +
          "<li><code>dump(obj)</code> dumps all that's known about the object</ul>");
    elements[i].classList.remove("nojavascript");
  }
}