function destroyItem(item) {
			var checkbox = item.checkbox;

			// destroy SVG elements
			each(['legendItem', 'legendLine', 'legendSymbol'], function (key) {
				if (item[key]) {
					item[key].destroy();
				}
			});

			if (checkbox) {
				discardElement(item.checkbox);
			}


		}