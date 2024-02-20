function getFilesByUrls(urls, result) {

  for(let i = 0; i < urls.length; i++){
    if(!!(urls[i].hasDirectoryPath())){
      getFilesByUrls(NSFileManager.defaultManager().contentsOfDirectoryAtURL_includingPropertiesForKeys_options_error(urls[i], null, null, null), result)
    }else{
      const ext = String(urls[i].pathExtension()).toLowerCase()
      if (AVAILABLE_EXT.indexOf(ext) !== -1){
        result.push(urls[i])
      }
    }
  }
}