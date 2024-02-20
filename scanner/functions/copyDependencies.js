function copyDependencies(newCodePackagePath,myLibs, currentSketch){
  // copyFolderContents(codePackageCopyPath + sketchDeps[0], pDirs[0] + "/" + sketchDeps[0])
  myLibs.forEach(function(lib){
    copyFolderContents(newCodePackagePath+"/"+lib, currentSketch + "/" + lib);
  })
}