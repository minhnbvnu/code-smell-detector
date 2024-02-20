function handleMarkdown(content, filename) {
    if (content.slice(0, 3) !== '---') {
      return;
    }

    const res = extractMetadata(content);
    const metadata = res.metadata;
    const rawContent = res.rawContent;

    if (metadata.sidebar !== false) {
      metadatas.files.push(metadata);
    }

    if (metadata.permalink.match(/^https?:/)) {
      return;
    }

    metadata.filename = filename;

    // Create a dummy .js version that just calls the associated layout
    var layout = metadata.layout[0].toUpperCase() + metadata.layout.substr(1) + 'Layout';

    writeFileAndCreateFolder(
      'src/react-native/' + metadata.permalink.replace(/\.html$/, '.js'),
      buildFile(layout, metadata, rawContent)
    );
  }