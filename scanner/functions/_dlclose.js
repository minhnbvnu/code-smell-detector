function _dlclose(handle){if(!DLFCN.loadedLibs[handle]){DLFCN.errorMsg="Tried to dlclose() unopened handle: "+handle;return 1}else{var lib_record=DLFCN.loadedLibs[handle];if(--lib_record.refcount==0){if(lib_record.module.cleanups){lib_record.module.cleanups.forEach((function(cleanup){cleanup()}))}delete DLFCN.loadedLibNames[lib_record.name];delete DLFCN.loadedLibs[handle]}return 0}}