function codePen() {
  var clip = $(".clip-path .show").text();
  var clip = clip.split(";").join(";\n");

  var width = ($demo_width = $("#demo_width").val());
  var height = ($demo_height = $("#demo_height").val());

  var CSS =
    "div {\n" +
    "\twidth: " +
    width +
    "px;\n" +
    "\theight: " +
    height +
    "px;\n" +
    "\tbackground: #1e90ff;\n" +
    "\t" +
    clip +
    "}\n" +
    "\n" +
    "/* Center the demo */\n" +
    "html, body { height: 100%; }\n" +
    "body {\n" +
    "\tdisplay: flex;\n" +
    "\tjustify-content: center;\n" +
    "\talign-items: center;\n" +
    "}";

  var data = {
    html: "<div></div>",
    css: CSS,
    css_pre_processor: "none",
    css_prefix: "autoprefixer",
    css_starter: "reset"
  };

  var JSONstring = JSON.stringify(data)
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

  var $form = $(
    '<form action="http://codepen.io/pen/define" method="POST" target="_blank">' +
      '<input type="hidden" name="data" value=\'' +
      JSONstring +
      "'>" +
      "</form>"
  );

  $form.submit();
}