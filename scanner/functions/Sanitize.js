function Sanitize(){
  var options;
  options = arguments[0] || {};
  this.jQuery = arguments[1] || {};
  this.config = {}
  this.config.elements = options.elements ? options.elements : [];
  this.config.attributes = options.attributes ? options.attributes : {};
  this.config.attributes[Sanitize.ALL] = this.config.attributes[Sanitize.ALL] ? this.config.attributes[Sanitize.ALL] : [];
  this.config.allow_comments = options.allow_comments ? options.allow_comments : false;
  this.allowed_elements = {};
  this.config.protocols = options.protocols ? options.protocols : {};
  this.config.add_attributes = options.add_attributes ? options.add_attributes  : {};
  this.dom = options.dom ? options.dom : document;
	for (var i = 0, len = this.config.elements.length; i < len; i++) {
		this.allowed_elements[this.config.elements[i]] = true;
	}
  this.config.remove_element_contents = {};
  this.config.remove_all_contents = false;
  if(options.remove_contents) {

     if (options.remove_contents instanceof Array) {
		  var elementContents = this.config.remove_element_contents;
		  for (var i = 0, len = options.remove_contents.length; i < len; i++) {
			  elementContents[options.remove_contents[i]] = true;
		  }
	  }
	  else {
		  this.config.remove_all_contents = true;
	  }
  }
  this.transformers = options.transformers ? options.transformers : [];

  // filters might let the sanitizer stop clean elements (and their children)
  this.filters = options.filters ? options.filters : [];
}