function scheduleProgramReload() {
                Debug.assert(!!configFileName);
                reloadLevel = 2 /* Full */;
                scheduleProgramUpdate();
            }