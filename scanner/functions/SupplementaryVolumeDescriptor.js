function SupplementaryVolumeDescriptor(data) {
	        PrimaryOrSupplementaryVolumeDescriptor.call(this, data);
	        if (this.type() !== 2 /* SupplementaryVolumeDescriptor */) {
	            throw new ApiError(ErrorCode.EIO, "Invalid supplementary volume descriptor.");
	        }
	        var escapeSequence = this.escapeSequence();
	        var third = escapeSequence[2];
	        // Third character identifies what 'level' of the UCS specification to follow.
	        // We ignore it.
	        if (escapeSequence[0] !== 0x25 || escapeSequence[1] !== 0x2F ||
	            (third !== 0x40 && third !== 0x43 && third !== 0x45)) {
	            throw new ApiError(ErrorCode.EIO, ("Unrecognized escape sequence for SupplementaryVolumeDescriptor: " + (escapeSequence.toString())));
	        }
	    }