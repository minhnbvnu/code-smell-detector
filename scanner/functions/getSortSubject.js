function getSortSubject(item) {
			var sortBy,
				sortField = configSortField;

			if(fmModel.viewMode() === 'list') {
				sortField = fmModel.itemsModel.listSortField();
			}

			switch(sortField) {
				case 'type':
					sortBy = item.cdo.extension || '';
					break;
				case 'size':
					sortBy = item.rdo.attributes.size;
					break;
				case 'modified':
					sortBy = item.rdo.attributes.modified;
					break;
				case 'dimensions':
					sortBy = item.cdo.dimensions || '';
					break;
				default:
					sortBy = item.rdo.attributes.name;
			}

			// strings should be ordered in lowercase (unless specified)
			if (typeof sortBy === 'string') {
				if (!sortParams.cases) {
					sortBy = sortBy.toLowerCase();
				}
				// spaces/newlines
				sortBy = sortBy.replace(/\s+/g, ' ');
			}
			return sortBy;
		}