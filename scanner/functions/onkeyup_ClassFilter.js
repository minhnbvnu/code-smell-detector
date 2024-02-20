function onkeyup_ClassFilter() {
		var listItems
		var search = document.getElementById('ClassFilter').value
		search = search.toLowerCase()
		if (document.getElementById('ClassList')) {
			listItems = document.getElementById('ClassList').getElementsByTagName('li')
			filterList(listItems, search)
		}
		if (document.getElementById('ClassList2')) {
			listItems = document.getElementById('ClassList2').getElementsByTagName('li')
			filterList(listItems, search)
		}
		if (document.getElementById('FileList')) {
			listItems = document.getElementById('FileList').getElementsByTagName('li')
			filterList(listItems, search)
		}
		if (document.getElementById('MethodsListInherited')) {
			var links = document.getElementById('MethodsListInherited').getElementsByTagName('a')
			var linksSelected = new Array()
			for (var i=0; i < links.length; i++) {
				if (links[i].parentNode.parentNode.tagName == "DD") {
					linksSelected.push(links[i])
				}
			}
			filterList(linksSelected, search)
		}
		if (document.getElementById('MethodsList')) {
			listItems = document.getElementById('MethodsList').getElementsByTagName('tbody')[0].getElementsByTagName('tr')
			filterList(listItems, search, document.getElementById('MethodDetail').getElementsByTagName('li'))
		}
	}