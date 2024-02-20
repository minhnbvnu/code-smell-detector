function filterRelatedList(listItem, search, relatedElements) {
		var itemIndex = parseInt(listItem.className.replace('item', ''))
		if (itemIndex <= relatedElements.length) {
			if (relatedElements[itemIndex].className == "item"+ itemIndex) {
				relatedElements[itemIndex].style.display = listItem.style.display
			}
		}
	}