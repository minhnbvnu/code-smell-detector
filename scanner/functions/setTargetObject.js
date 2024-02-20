function setTargetObject(obj, attr) {
			targetObject = obj;
			targetAttribute = attr;
			additionalTargetObjects = [];

			setItem(null);
			
			if (obj && attr) {
				lastAttributeValue = $(obj).attr(attr);
				setValue($(targetObject).attr(targetAttribute));
			} else {
				setValue('');
				return;
			}

			// check whether a repository item is linked to the object
			RepositoryManager.getObject( obj, function ( items ) {
				if (items && items.length > 0) {
					setItem(items[0]);
				}
			} );
		}