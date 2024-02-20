function formatHtmlEntry(type, data) {
  let content;
  switch (type.toLowerCase()) {
    case 'inproceedings':
      content = [
        `${formatAuthors(data.author)} (${data.year}). ${data.title}.`,
        `In <em>${data.booktitle}</em> (pp. ${data.pages}). ${linkify(data.url)}`,
      ].join(' ');
      break;

    case 'article':
      content = [
        `${formatAuthors(data.author)} (${data.year}).`,
        `${data.title}.`,
        `<em>${data.journal}</em>,`,
        `${data.volume}${optional(data.issue, data.number)},`,
        `${data.pages}.`,
        `${linkifyDOI(data.doi)}`,
      ].join(' ');
      break;

    case 'book':
      content = [
        `${formatAuthors(data.author)} (${data.year}).`,
        `<em>${data.title}</em>.`,
        `${data.publisher}`,
      ].join(' ');
      break;

    case 'online':
      content = [
        `${formatAuthors(data.author)} (${data.year}).`,
        `${data.title}.`,
        `${linkify(data.url)} (${data.urldate}).`,
        `${data.note || ''}`,
      ].join(' ');
      break;

    case 'misc':
    default:
      content = [
        `${formatAuthors(data.author)} (${data.year}).`,
        `${linkifyTitle(data.title, data.url)}.`,
        `${data.note || ''}`,
      ].join(' ');

  }

  return replaceLaTeXChars(content);
}