function decodePathname(pathname) {
  const pieces = pathname.replace(/\\/g, '/').split('/');

  return path.normalize(pieces.map((rawPiece) => {
    const piece = decodeURIComponent(rawPiece);

    if (process.platform === 'win32' && /\\/.test(piece)) {
      throw new Error('Invalid forward slash character');
    }

    return piece;
  }).join('/'));
}