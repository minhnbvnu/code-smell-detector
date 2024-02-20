function makeNestedMenus(parentCloseHandler, menu){
		var elems = [];
		$.each(menu, function (_, item) {
			var elem = $('<li>');
			elem.append($('<a>', {'href': 'javascript:void 0', 'html': Utils.makeButtonLabelWithIcon(item)}));
			if (item.click) {
				elem.data('aloha-ui-menubutton-select', function (){
					parentCloseHandler();
					item.click();
				});
			}
			if (item.menu) {
				var nestedMenu = $('<ul>').appendTo(elem);
				nestedMenu.append(
					makeNestedMenus(makeCloseHandler(nestedMenu, parentCloseHandler),
									item.menu));
			}
			elems.push(elem[0]);
		});
		return elems;
	}