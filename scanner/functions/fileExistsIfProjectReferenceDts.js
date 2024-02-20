function fileExistsIfProjectReferenceDts(file) {
                const source = host.getSourceOfProjectReferenceRedirect(host.toPath(file));
                return source !== void 0 ? isString(source) ? originalFileExists.call(host.compilerHost, source) : true : void 0;
            }