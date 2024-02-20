function getDetailView(resourceObject) {
		if(!resourceObject.attributes.readable) {
			fm.error(lg('NOT_ALLOWED_SYSTEM'));
			return false;
		}
		if(resourceObject.type === 'file') {
            fmModel.previewModel.applyObject(resourceObject);
		}
		if(resourceObject.type === 'folder' || resourceObject.type === 'parent') {
            fmModel.previewFile(false);
			fmModel.itemsModel.loadDataList(resourceObject.id);
		}
	}