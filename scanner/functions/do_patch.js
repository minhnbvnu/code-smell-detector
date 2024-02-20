async function do_patch(libname, getfile) {
		if (!(libname in lib_patches)) {
			console.error("Invalid library", libname);
			return null;
		}

		if (libname in cache)
			return cache[libname];

		var patchinfo = lib_patches[libname];
		var data = {};

		var fetched_file = await getfile(patchinfo.files);
		if (!fetched_file) {
			console.error("Unable to load file", patchinfo.files);
			return null;
		} else {
			data[patchinfo.files] = fetched_file;
		}

		if (patchinfo.requires) {
			var fetched_require = await do_patch(patchinfo.requires, getfile);
			if (!fetched_require) {
				console.error("Unable to load dependency", patchinfo.requires);
				return null;
			}

			data[patchinfo.requires] = fetched_require;
		}

		var patched = patchinfo.patch(unwrap_object(data));
		if (patchinfo.cached)
			cache[libname] = patched;

		return patched;
	}