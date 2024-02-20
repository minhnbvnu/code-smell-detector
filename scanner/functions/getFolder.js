function getFolder(client) {
  if(client.currentSharedFolder) return client.currentSharedFolder
  const cache = config.read()
  if(cache){
    try {
      const folder = cache.sharedFolder
      if(fs.existsSync(folder)) return folder
    }catch(e){
    }
  }
  if (process.cwd()) {
    return process.cwd()
  } else 
    return os.homedir()
}