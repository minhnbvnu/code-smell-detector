function IsoFS(data, name, deprecateMsg) {
	        var this$1 = this;
	        if ( name === void 0 ) name = "";
	        if ( deprecateMsg === void 0 ) deprecateMsg = true;
	
	        SynchronousFileSystem$$1.call(this);
	        this._data = data;
	        deprecationMessage(deprecateMsg, IsoFS.Name, { data: "ISO data as a Buffer", name: name });
	        // Skip first 16 sectors.
	        var vdTerminatorFound = false;
	        var i = 16 * 2048;
	        var candidateVDs = new Array();
	        while (!vdTerminatorFound) {
	            var slice = data.slice(i);
	            var vd = new VolumeDescriptor(slice);
	            switch (vd.type()) {
	                case 1 /* PrimaryVolumeDescriptor */:
	                    candidateVDs.push(new PrimaryVolumeDescriptor(slice));
	                    break;
	                case 2 /* SupplementaryVolumeDescriptor */:
	                    candidateVDs.push(new SupplementaryVolumeDescriptor(slice));
	                    break;
	                case 255 /* VolumeDescriptorSetTerminator */:
	                    vdTerminatorFound = true;
	                    break;
	            }
	            i += 2048;
	        }
	        if (candidateVDs.length === 0) {
	            throw new ApiError(ErrorCode.EIO, "Unable to find a suitable volume descriptor.");
	        }
	        candidateVDs.forEach(function (v) {
	            // Take an SVD over a PVD.
	            if (!this$1._pvd || this$1._pvd.type() !== 2 /* SupplementaryVolumeDescriptor */) {
	                this$1._pvd = v;
	            }
	        });
	        this._root = this._pvd.rootDirectoryEntry(data);
	        this._name = name;
	    }