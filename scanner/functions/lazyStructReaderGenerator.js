function* lazyStructReaderGenerator(decoder) {
  const numOfStateUpdates = decoding.readVarUint(decoder.restDecoder);

  for (let i = 0; i < numOfStateUpdates; i++) {
    const numberOfStructs = decoding.readVarUint(decoder.restDecoder);
    const client = decoder.readClient();
    let clock = decoding.readVarUint(decoder.restDecoder);

    for (let i = 0; i < numberOfStructs; i++) {
      const info = decoder.readInfo(); // @todo use switch instead of ifs

      if (info === 10) {
        const len = decoding.readVarUint(decoder.restDecoder);
        yield new Skip(createID(client, clock), len);
        clock += len;
      } else if ((binary.BITS5 & info) !== 0) {
        const cantCopyParentInfo = (info & (binary.BIT7 | binary.BIT8)) === 0; // If parent = null and neither left nor right are defined, then we know that `parent` is child of `y`
        // and we read the next string as parentYKey.
        // It indicates how we store/retrieve parent from `y.share`
        // @type {string|null}

        const struct = new Item(createID(client, clock), null, // left
        (info & binary.BIT8) === binary.BIT8 ? decoder.readLeftID() : null, // origin
        null, // right
        (info & binary.BIT7) === binary.BIT7 ? decoder.readRightID() : null, // right origin
        // @ts-ignore Force writing a string here.
        cantCopyParentInfo ? decoder.readParentInfo() ? decoder.readString() : decoder.readLeftID() : null, // parent
        cantCopyParentInfo && (info & binary.BIT6) === binary.BIT6 ? decoder.readString() : null, // parentSub
        readItemContent(decoder, info) // item content
        );
        yield struct;
        clock += struct.length;
      } else {
        const len = decoder.readLen();
        yield new GC(createID(client, clock), len);
        clock += len;
      }
    }
  }
}