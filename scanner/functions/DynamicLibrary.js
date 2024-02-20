function DynamicLibrary (path, mode) {
  if (!(this instanceof DynamicLibrary)) {
    return new DynamicLibrary(path, mode);
  }
  debug('new DynamicLibrary()', path, mode);

  if (null == mode) {
    mode = DynamicLibrary.FLAGS.RTLD_LAZY;
  }

  this._path = path;
  this._handle = dlopen(path, mode);
  assert(Buffer.isBuffer(this._handle), 'expected a Buffer instance to be returned from `dlopen()`');

  if (this._handle.isNull()) {
    var err = this.error();

    // THIS CODE IS BASED ON GHC Trac ticket #2615
    // http://hackage.haskell.org/trac/ghc/attachment/ticket/2615

    // On some systems (e.g., Gentoo Linux) dynamic files (e.g. libc.so)
    // contain linker scripts rather than ELF-format object code. This
    // code handles the situation by recognizing the real object code
    // file name given in the linker script.

    // If an "invalid ELF header" error occurs, it is assumed that the
    // .so file contains a linker script instead of ELF object code.
    // In this case, the code looks for the GROUP ( ... ) linker
    // directive. If one is found, the first file name inside the
    // parentheses is treated as the name of a dynamic library and the
    // code attempts to dlopen that file. If this is also unsuccessful,
    // an error message is returned.

    // see if the error message is due to an invalid ELF header
    let match;

    if (match = err.match(/^(([^ \t()])+\.so([^ \t:()])*):([ \t])*/)) {
      const content = read(match[1], 'ascii');
      // try to find a GROUP ( ... ) command
      if (match = content.match(/GROUP *\( *(([^ )])+)/)){
        return DynamicLibrary.call(this, match[1], mode);
      }
    }

    throw new Error('Dynamic Linking Error: ' + err);
  }
}