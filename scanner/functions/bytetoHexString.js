function bytetoHexString(buffer) {
        return Array
        .from(new Uint8Array (buffer))
        .map(function(b) { return b.toString(16).padStart(2, "0"); })
        .join("");
      }