function useTinymce5(url){
    if (!usingTinymce5()) { return; }

    parent.postMessage({
      mceAction: 'insert',
      content: url
    });

    parent.postMessage({ mceAction: 'close' });
  }