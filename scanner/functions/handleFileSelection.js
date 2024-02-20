function handleFileSelection(e) {
  const selectedFile = e.target.files[0];

  if (selectedFile) {
    reader.readAsDataURL(selectedFile);
  }
}