async function autoInstall(platform){
    let browserFetcher = puppeteer.createBrowserFetcher({host, platform})
    const revisionInfo = browserFetcher.revisionInfo(revision);
    
    let readyToInstallVersion = revisionInfo.revision
    console.log("start to install ", platform, ' version chrome')
    console.log("install revision =>", readyToInstallVersion)
    
    await browserFetcher.download(readyToInstallVersion)
      .then(() => { console.log(`install chrome browser(${platform}-${readyToInstallVersion}) success!`) })
      .catch(err => { 
        console.log(`install chrome browser(${platform}-${readyToInstallVersion}) failed!`)  
        console.log('Error', err) 
    })
    return
}