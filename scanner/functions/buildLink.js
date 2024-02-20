function buildLink(data, mime){
				if(interceptCallback){
					if(interceptCallback === true){
						this.triggerDownload(data, mime, type, filename, true);
					}else {
						interceptCallback(data);
					}

				}else {
					this.triggerDownload(data, mime, type, filename);
				}
			}