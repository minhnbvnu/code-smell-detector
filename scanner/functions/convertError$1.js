function convertError$1(err, p, expectedDir) {
	    switch (err.name) {
	        /* The user agent failed to create a file or directory due to the existence of a file or
	            directory with the same path.  */
	        case "PathExistsError":
	            return ApiError.EEXIST(p);
	        /* The operation failed because it would cause the application to exceed its storage quota.  */
	        case 'QuotaExceededError':
	            return ApiError.FileError(ErrorCode.ENOSPC, p);
	        /*  A required file or directory could not be found at the time an operation was processed.   */
	        case 'NotFoundError':
	            return ApiError.ENOENT(p);
	        /* This is a security error code to be used in situations not covered by any other error codes.
	            - A required file was unsafe for access within a Web application
	            - Too many calls are being made on filesystem resources */
	        case 'SecurityError':
	            return ApiError.FileError(ErrorCode.EACCES, p);
	        /* The modification requested was illegal. Examples of invalid modifications include moving a
	            directory into its own child, moving a file into its parent directory without changing its name,
	            or copying a directory to a path occupied by a file.  */
	        case 'InvalidModificationError':
	            return ApiError.FileError(ErrorCode.EPERM, p);
	        /* The user has attempted to look up a file or directory, but the Entry found is of the wrong type
	            [e.g. is a DirectoryEntry when the user requested a FileEntry].  */
	        case 'TypeMismatchError':
	            return ApiError.FileError(expectedDir ? ErrorCode.ENOTDIR : ErrorCode.EISDIR, p);
	        /* A path or URL supplied to the API was malformed.  */
	        case "EncodingError":
	        /* An operation depended on state cached in an interface object, but that state that has changed
	            since it was read from disk.  */
	        case "InvalidStateError":
	        /* The user attempted to write to a file or directory which could not be modified due to the state
	            of the underlying filesystem.  */
	        case "NoModificationAllowedError":
	        default:
	            return ApiError.FileError(ErrorCode.EINVAL, p);
	    }
	}