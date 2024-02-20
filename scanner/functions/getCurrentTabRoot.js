function getCurrentTabRoot(callback){
  chrome.tabs.query({active:true, currentWindow:true},function(tabs){
    callback(this.extractRootWebsite(tabs[0].url));
  });
}