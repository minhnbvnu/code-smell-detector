function restoreShaders() {
                fragShaders = {};
                vertShaders = {};
                for (var i = 0; i < programList.length; ++i) {
                    linkProgram(programList[i], null, programList[i].attributes.map(function (info) {
                        return [info.location, info.name];
                    }));
                }
            }