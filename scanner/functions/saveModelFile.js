function saveModelFile()
{
    // There is no JS API in most browsers to prompt a file download. Chrome has
    // a file system API, but as of writing other browsers have no equivalent.
    //
    // Instead, a download typically occurs when your browser opens a URL and
    // decides the content should be saved as a file (rather than displayed or
    // used in a window).
    //
    // To save our file here, we will ask the browser to open a special kind of
    // of URL that uses the blob protocol. Our URL will not point to an external
    // resource, instead it will contain all data we want the user to download.
    //
    // We can ask the browser to open our URL in a few different ways. Here, we
    // will simulate a link on the page being clicked. It's a good user
    // experience compared to opening the URL in a new tab or window, which
    // takes the user away from the current page.
    let a = document.createElement('a');

    // Generate a default save file name
    let saveFileName =`${inputProjectTitle.value || 'untitled_project'}.ncft`;
    saveFileName = saveFileName.toLowerCase();
    saveFileName = saveFileName.replace(/[^a-z0-9.]/gi, "_");

    // This is what the browser will name the download by default.
    //
    // If the browser is configured to automatically save downloads in a fixed
    // location, this will be the default name for the file. If a file already
    // exists with that name, the name will be modified to prevent a conflict
    // ("example.ncft" might become "example (1).ncft") or the user will be
    // asked what to do (replace, modify the name, or cancel the download).
    //
    // If the browser is configured to prompt the user for a save location, this
    // will be the default name in the save dialog. The user can usually change
    // the name if they would like.
    a.download = saveFileName;

    // This is the binary large object (blob) we would like to send to the user.
    let blob = new Blob(
        [model.serialize()],
        {type: 'application/json'}
    );

    // This is the URL we're asking the browser to open, which will prompt the
    // blob download.
    //
    // In major browsers, the maximum size for this URL is quite generous. It
    // should pose no problem here. See: https://stackoverflow.com/a/43816041
    a.href = window.URL.createObjectURL(blob);

    a.click();
}