function urls_to_links(text) {
  return text.replace(url_to_links_rx, "$1<a target='_blank' href='$2'>$2</a>");
}