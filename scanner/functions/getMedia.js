function getMedia(){
    chrome.mediaGalleries.getMediaFileSystems({
        interactive: 'if_needed'
    }, listMediaGalleries);
}