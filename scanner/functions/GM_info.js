function GM_info(userscript, version) {
            let info = {
                version: version,
                scriptHandler: "Stay",
                script: {
                    version: userscript.version,
                    description: userscript.description,
                    namespace: userscript.namespace,
                    resources: userscript.resourceUrls ? userscript.resourceUrls : [],
                    includes: userscript.includes ? userscript.includes : [],
                    excludes: userscript.excludes ? userscript.excludes : [],
                    matches: userscript.matches ? userscript.matches : []
                }
            };
            return JSON.stringify(info);
        }