function downloadFile(data, type, filename) {
  const blob = new Blob([data], { type });
  let link = document.createElement('a');
  if (link.download !== undefined) {
    let url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}