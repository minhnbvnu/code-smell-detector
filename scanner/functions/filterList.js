function filterList(listItems, search, relatedElements) {
		var itemContent = ""
		for (var i=0; i < listItems.length; i++) {
			itemContent = listItems[i].textContent||listItems[i].innerText
			if (itemContent != undefined) {
				itemContent = itemContent.toLowerCase()
				itemContent = itemContent.replace(/\s/g, "")
				if (itemContent.indexOf(search) >= 0 || itemContent == "") {
					listItems[i].style.display = ""
				} else {
					listItems[i].style.display = "none"
				}
				if (relatedElements != null) {
					filterRelatedList(listItems[i], search, relatedElements)
				}
			}
		}
	}