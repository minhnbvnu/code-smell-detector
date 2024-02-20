function updateRootFileNames(files) {
                Debug.assert(!configFileName, "Cannot update root file names with config file watch mode");
                rootFileNames = files;
                scheduleProgramUpdate();
            }