function getWindowsScriptHostIO() {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var streamObjectPool = [];
        function getStreamObject() {
            if(streamObjectPool.length > 0) {
                return streamObjectPool.pop();
            } else {
                return new ActiveXObject("ADODB.Stream");
            }
        }
        function releaseStreamObject(obj) {
            streamObjectPool.push(obj);
        }
        var args = [];
        for(var i = 0; i < WScript.Arguments.length; i++) {
            args[i] = WScript.Arguments.Item(i);
        }
        return {
            readFile: function (path) {
                try  {
                    var streamObj = getStreamObject();
                    streamObj.Open();
                    streamObj.Type = 2;
                    streamObj.Charset = 'x-ansi';
                    streamObj.LoadFromFile(path);
                    var bomChar = streamObj.ReadText(2);
                    streamObj.Position = 0;
                    if((bomChar.charCodeAt(0) == 254 && bomChar.charCodeAt(1) == 255) || (bomChar.charCodeAt(0) == 255 && bomChar.charCodeAt(1) == 254)) {
                        streamObj.Charset = 'unicode';
                    } else {
                        if(bomChar.charCodeAt(0) == 239 && bomChar.charCodeAt(1) == 187) {
                            streamObj.Charset = 'utf-8';
                        }
                    }
                    var str = streamObj.ReadText(-1);
                    streamObj.Close();
                    releaseStreamObject(streamObj);
                    return str;
                } catch (err) {
                    IOUtils.throwIOError("Error reading file \"" + path + "\".", err);
                }
            },
            writeFile: function (path, contents) {
                var file = this.createFile(path);
                file.Write(contents);
                file.Close();
            },
            fileExists: function (path) {
                return fso.FileExists(path);
            },
            resolvePath: function (path) {
                return fso.GetAbsolutePathName(path);
            },
            dirName: function (path) {
                return fso.GetParentFolderName(path);
            },
            findFile: function (rootPath, partialFilePath) {
                var path = fso.GetAbsolutePathName(rootPath) + "/" + partialFilePath;
                while(true) {
                    if(fso.FileExists(path)) {
                        try  {
                            var content = this.readFile(path);
                            return {
                                content: content,
                                path: path
                            };
                        } catch (err) {
                        }
                    } else {
                        rootPath = fso.GetParentFolderName(fso.GetAbsolutePathName(rootPath));
                        if(rootPath == "") {
                            return null;
                        } else {
                            path = fso.BuildPath(rootPath, partialFilePath);
                        }
                    }
                }
            },
            deleteFile: function (path) {
                try  {
                    if(fso.FileExists(path)) {
                        fso.DeleteFile(path, true);
                    }
                } catch (e) {
                    IOUtils.throwIOError("Couldn't delete file '" + path + "'.", e);
                }
            },
            createFile: function (path, useUTF8) {
                try  {
                    var streamObj = getStreamObject();
                    streamObj.Charset = useUTF8 ? 'utf-8' : 'x-ansi';
                    streamObj.Open();
                    return {
                        Write: function (str) {
                            streamObj.WriteText(str, 0);
                        },
                        WriteLine: function (str) {
                            streamObj.WriteText(str, 1);
                        },
                        Close: function () {
                            try  {
                                streamObj.SaveToFile(path, 2);
                            } catch (saveError) {
                                IOUtils.throwIOError("Couldn't write to file '" + path + "'.", saveError);
                            }finally {
                                if(streamObj.State != 0) {
                                    streamObj.Close();
                                }
                                releaseStreamObject(streamObj);
                            }
                        }
                    };
                } catch (creationError) {
                    IOUtils.throwIOError("Couldn't write to file '" + path + "'.", creationError);
                }
            },
            directoryExists: function (path) {
                return fso.FolderExists(path);
            },
            createDirectory: function (path) {
                try  {
                    if(!this.directoryExists(path)) {
                        fso.CreateFolder(path);
                    }
                } catch (e) {
                    IOUtils.throwIOError("Couldn't create directory '" + path + "'.", e);
                }
            },
            dir: function (path, spec, options) {
                options = options || {
                };
                function filesInFolder(folder, root) {
                    var paths = [];
                    var fc;
                    if(options.recursive) {
                        fc = new Enumerator(folder.subfolders);
                        for(; !fc.atEnd(); fc.moveNext()) {
                            paths = paths.concat(filesInFolder(fc.item(), root + "/" + fc.item().Name));
                        }
                    }
                    fc = new Enumerator(folder.files);
                    for(; !fc.atEnd(); fc.moveNext()) {
                        if(!spec || fc.item().Name.match(spec)) {
                            paths.push(root + "/" + fc.item().Name);
                        }
                    }
                    return paths;
                }
                var folder = fso.GetFolder(path);
                var paths = [];
                return filesInFolder(folder, path);
            },
            print: function (str) {
                WScript.StdOut.Write(str);
            },
            printLine: function (str) {
                WScript.Echo(str);
            },
            arguments: args,
            stderr: WScript.StdErr,
            stdout: WScript.StdOut,
            watchFile: null,
            run: function (source, filename) {
                try  {
                    eval(source);
                } catch (e) {
                    IOUtils.throwIOError("Error while executing file '" + filename + "'.", e);
                }
            },
            getExecutingFilePath: function () {
                return WScript.ScriptFullName;
            },
            quit: function (exitCode) {
                if (typeof exitCode === "undefined") { exitCode = 0; }
                try  {
                    WScript.Quit(exitCode);
                } catch (e) {
                }
            }
        };
    }