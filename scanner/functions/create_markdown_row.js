function create_markdown_row(index, list_item) {
	var item = that.new_item(index);
	var span12 = item.children().first();
	span12.empty();
	that.contents.get(list_item.path, {"content": true}).then(
          function (data) {
	    span12.append($('<div style="margin:auto;text-align:center;color:grey"/>').innerHTML = marked.marked(data.content));
	  },
          function(error) {
            span12.append(i18n.msg._("Server error: ") + error.message);
	  });
      }