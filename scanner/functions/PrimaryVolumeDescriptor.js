function PrimaryVolumeDescriptor(data) {
	        PrimaryOrSupplementaryVolumeDescriptor.call(this, data);
	        if (this.type() !== 1 /* PrimaryVolumeDescriptor */) {
	            throw new ApiError(ErrorCode.EIO, "Invalid primary volume descriptor.");
	        }
	    }