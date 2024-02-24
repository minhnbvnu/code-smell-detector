async function promptForFileReferences({
  accept,
  directory = false
} = {
  accept: null,
  directory: false
}) {
  return new Promise(resolve => {
    // Does this represent a memory leak somehow?
    // Can this fail? Do we ever reject?
    const fileInput = document.createElement("input");
    if (accept) fileInput.setAttribute("accept", accept);
    fileInput.type = "file";
    fileInput.multiple = true; // @ts-ignore Non-standard

    fileInput.webkitdirectory = directory; // @ts-ignore Non-standard

    fileInput.directory = directory; // @ts-ignore Non-standard

    fileInput.mozdirectory = directory; // Not entirely sure why this is needed, since the input
    // was just created, but somehow this helps prevent change
    // events from getting swallowed.
    // https://stackoverflow.com/a/12102992/1263117
    // @ts-ignore Technically you can't set this to null, it has to be a string.
    // But I don't feel like retesting it, so I'll leave it as null

    fileInput.value = null;
    fileInput.addEventListener("change", e => {
      const files = e.target.files;
      resolve(files);
    });
    fileInput.click();
  });
}