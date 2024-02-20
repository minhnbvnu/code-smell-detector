function convInlineCodes(desc) {
  var result = desc.replace(/<pre>/ig, '<pre class="prettyprint linenums">');
  result = result.replace(/\{@link ([^} ]+) ?\}/gi, "<code>$1</code>");
	return result;
}