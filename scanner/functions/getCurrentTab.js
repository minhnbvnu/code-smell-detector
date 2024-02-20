function getCurrentTab(callback){
  chrome.tabs.query({active:true, currentWindow:true},function(tabs){
    callback(tabs[0].url);
  });
}