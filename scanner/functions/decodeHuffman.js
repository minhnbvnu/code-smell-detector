function decodeHuffman(tree) {
      var node = tree;

      while (true) {
        node = node[readBit()];

        switch (typeof node) {
          case "number":
            return node;

          case "object":
            continue;
        }

        throw new JpegError("invalid huffman sequence");
      }
    }