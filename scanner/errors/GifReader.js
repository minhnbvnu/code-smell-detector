function GifReader(buf) {
  var p = 0;

  // - Header (GIF87a or GIF89a).
  if (
    buf[p++] !== 0x47 ||
    buf[p++] !== 0x49 ||
    buf[p++] !== 0x46 ||
    buf[p++] !== 0x38 ||
    ((buf[p++] + 1) & 0xfd) !== 0x38 ||
    buf[p++] !== 0x61
  ) {
    throw new Error("Invalid GIF 87a/89a header.");
  }

  // - Logical Screen Descriptor.
  var width = buf[p++] | (buf[p++] << 8);
  var height = buf[p++] | (buf[p++] << 8);
  var pf0 = buf[p++]; // <Packed Fields>.
  var global_palette_flag = pf0 >> 7;
  var num_global_colors_pow2 = pf0 & 0x7;
  var num_global_colors = 1 << (num_global_colors_pow2 + 1);
  buf[p++];
  buf[p++]; // Pixel aspect ratio (unused?).

  var global_palette_offset = null;
  var global_palette_size = null;

  if (global_palette_flag) {
    global_palette_offset = p;
    global_palette_size = num_global_colors;
    p += num_global_colors * 3; // Seek past palette.
  }

  var no_eof = true;

  var frames = [];

  var delay = 0;
  var transparent_index = null;
  var disposal = 0; // 0 - No disposal specified.
  var loop_count = null;

  this.width = width;
  this.height = height;

  while (no_eof && p < buf.length) {
    switch (buf[p++]) {
      case 0x21: // Graphics Control Extension Block
        switch (buf[p++]) {
          case 0xff: // Application specific block
            // Try if it's a Netscape block (with animation loop counter).
            if (
              buf[p] !== 0x0b || // 21 FF already read, check block size.
              // NETSCAPE2.0
              (buf[p + 1] == 0x4e &&
                buf[p + 2] == 0x45 &&
                buf[p + 3] == 0x54 &&
                buf[p + 4] == 0x53 &&
                buf[p + 5] == 0x43 &&
                buf[p + 6] == 0x41 &&
                buf[p + 7] == 0x50 &&
                buf[p + 8] == 0x45 &&
                buf[p + 9] == 0x32 &&
                buf[p + 10] == 0x2e &&
                buf[p + 11] == 0x30 &&
                // Sub-block
                buf[p + 12] == 0x03 &&
                buf[p + 13] == 0x01 &&
                buf[p + 16] == 0)
            ) {
              p += 14;
              loop_count = buf[p++] | (buf[p++] << 8);
              p++; // Skip terminator.
            } else {
              // We don't know what it is, just try to get past it.
              p += 12;
              while (true) {
                // Seek through subblocks.
                var block_size = buf[p++];
                // Bad block size (ex: undefined from an out of bounds read).
                if (!(block_size >= 0)) throw Error("Invalid block size");
                if (block_size === 0) break; // 0 size is terminator
                p += block_size;
              }
            }
            break;

          case 0xf9: // Graphics Control Extension
            if (buf[p++] !== 0x4 || buf[p + 4] !== 0)
              throw new Error("Invalid graphics extension block.");
            var pf1 = buf[p++];
            delay = buf[p++] | (buf[p++] << 8);
            transparent_index = buf[p++];
            if ((pf1 & 1) === 0) transparent_index = null;
            disposal = (pf1 >> 2) & 0x7;
            p++; // Skip terminator.
            break;

          case 0xfe: // Comment Extension.
            while (true) {
              // Seek through subblocks.
              var block_size = buf[p++];
              // Bad block size (ex: undefined from an out of bounds read).
              if (!(block_size >= 0)) throw Error("Invalid block size");
              if (block_size === 0) break; // 0 size is terminator
              // console.log(buf.slice(p, p+block_size).toString('ascii'));
              p += block_size;
            }
            break;

          default:
            throw new Error(
              "Unknown graphic control label: 0x" + buf[p - 1].toString(16)
            );
        }
        break;

      case 0x2c: // Image Descriptor.
        var x = buf[p++] | (buf[p++] << 8);
        var y = buf[p++] | (buf[p++] << 8);
        var w = buf[p++] | (buf[p++] << 8);
        var h = buf[p++] | (buf[p++] << 8);
        var pf2 = buf[p++];
        var local_palette_flag = pf2 >> 7;
        var interlace_flag = (pf2 >> 6) & 1;
        var num_local_colors_pow2 = pf2 & 0x7;
        var num_local_colors = 1 << (num_local_colors_pow2 + 1);
        var palette_offset = global_palette_offset;
        var palette_size = global_palette_size;
        var has_local_palette = false;
        if (local_palette_flag) {
          var has_local_palette = true;
          palette_offset = p; // Override with local palette.
          palette_size = num_local_colors;
          p += num_local_colors * 3; // Seek past palette.
        }

        var data_offset = p;

        p++; // codesize
        while (true) {
          var block_size = buf[p++];
          // Bad block size (ex: undefined from an out of bounds read).
          if (!(block_size >= 0)) throw Error("Invalid block size");
          if (block_size === 0) break; // 0 size is terminator
          p += block_size;
        }

        frames.push({
          x: x,
          y: y,
          width: w,
          height: h,
          has_local_palette: has_local_palette,
          palette_offset: palette_offset,
          palette_size: palette_size,
          data_offset: data_offset,
          data_length: p - data_offset,
          transparent_index: transparent_index,
          interlaced: !!interlace_flag,
          delay: delay,
          disposal: disposal
        });
        break;

      case 0x3b: // Trailer Marker (end of file).
        no_eof = false;
        break;

      default:
        throw new Error("Unknown gif block: 0x" + buf[p - 1].toString(16));
    }
  }

  this.numFrames = function() {
    return frames.length;
  };

  this.loopCount = function() {
    return loop_count;
  };

  this.frameInfo = function(frame_num) {
    if (frame_num < 0 || frame_num >= frames.length)
      throw new Error("Frame index out of range.");
    return frames[frame_num];
  };

  this.decodeAndBlitFrameBGRA = function(frame_num, pixels) {
    var frame = this.frameInfo(frame_num);
    var num_pixels = frame.width * frame.height;
    var index_stream = new Uint8Array(num_pixels); // At most 8-bit indices.
    GifReaderLZWOutputIndexStream(
      buf,
      frame.data_offset,
      index_stream,
      num_pixels
    );
    var palette_offset = frame.palette_offset;

    // NOTE(deanm): It seems to be much faster to compare index to 256 than
    // to === null.  Not sure why, but CompareStub_EQ_STRICT shows up high in
    // the profile, not sure if it's related to using a Uint8Array.
    var trans = frame.transparent_index;
    if (trans === null) trans = 256;

    // We are possibly just blitting to a portion of the entire frame.
    // That is a subrect within the framerect, so the additional pixels
    // must be skipped over after we finished a scanline.
    var framewidth = frame.width;
    var framestride = width - framewidth;
    var xleft = framewidth; // Number of subrect pixels left in scanline.

    // Output indices of the top left and bottom right corners of the subrect.
    var opbeg = (frame.y * width + frame.x) * 4;
    var opend = ((frame.y + frame.height) * width + frame.x) * 4;
    var op = opbeg;

    var scanstride = framestride * 4;

    // Use scanstride to skip past the rows when interlacing.  This is skipping
    // 7 rows for the first two passes, then 3 then 1.
    if (frame.interlaced === true) {
      scanstride += width * 4 * 7; // Pass 1.
    }

    var interlaceskip = 8; // Tracking the row interval in the current pass.

    for (var i = 0, il = index_stream.length; i < il; ++i) {
      var index = index_stream[i];

      if (xleft === 0) {
        // Beginning of new scan line
        op += scanstride;
        xleft = framewidth;
        if (op >= opend) {
          // Catch the wrap to switch passes when interlacing.
          scanstride = framestride * 4 + width * 4 * (interlaceskip - 1);
          // interlaceskip / 2 * 4 is interlaceskip << 1.
          op = opbeg + (framewidth + framestride) * (interlaceskip << 1);
          interlaceskip >>= 1;
        }
      }

      if (index === trans) {
        op += 4;
      } else {
        var r = buf[palette_offset + index * 3];
        var g = buf[palette_offset + index * 3 + 1];
        var b = buf[palette_offset + index * 3 + 2];
        pixels[op++] = b;
        pixels[op++] = g;
        pixels[op++] = r;
        pixels[op++] = 255;
      }
      --xleft;
    }
  };

  // I will go to copy and paste hell one day...
  this.decodeAndBlitFrameRGBA = function(frame_num, pixels) {
    var frame = this.frameInfo(frame_num);
    var num_pixels = frame.width * frame.height;
    var index_stream = new Uint8Array(num_pixels); // At most 8-bit indices.
    GifReaderLZWOutputIndexStream(
      buf,
      frame.data_offset,
      index_stream,
      num_pixels
    );
    var palette_offset = frame.palette_offset;

    // NOTE(deanm): It seems to be much faster to compare index to 256 than
    // to === null.  Not sure why, but CompareStub_EQ_STRICT shows up high in
    // the profile, not sure if it's related to using a Uint8Array.
    var trans = frame.transparent_index;
    if (trans === null) trans = 256;

    // We are possibly just blitting to a portion of the entire frame.
    // That is a subrect within the framerect, so the additional pixels
    // must be skipped over after we finished a scanline.
    var framewidth = frame.width;
    var framestride = width - framewidth;
    var xleft = framewidth; // Number of subrect pixels left in scanline.

    // Output indices of the top left and bottom right corners of the subrect.
    var opbeg = (frame.y * width + frame.x) * 4;
    var opend = ((frame.y + frame.height) * width + frame.x) * 4;
    var op = opbeg;

    var scanstride = framestride * 4;

    // Use scanstride to skip past the rows when interlacing.  This is skipping
    // 7 rows for the first two passes, then 3 then 1.
    if (frame.interlaced === true) {
      scanstride += width * 4 * 7; // Pass 1.
    }

    var interlaceskip = 8; // Tracking the row interval in the current pass.

    for (var i = 0, il = index_stream.length; i < il; ++i) {
      var index = index_stream[i];

      if (xleft === 0) {
        // Beginning of new scan line
        op += scanstride;
        xleft = framewidth;
        if (op >= opend) {
          // Catch the wrap to switch passes when interlacing.
          scanstride = framestride * 4 + width * 4 * (interlaceskip - 1);
          // interlaceskip / 2 * 4 is interlaceskip << 1.
          op = opbeg + (framewidth + framestride) * (interlaceskip << 1);
          interlaceskip >>= 1;
        }
      }

      if (index === trans) {
        op += 4;
      } else {
        var r = buf[palette_offset + index * 3];
        var g = buf[palette_offset + index * 3 + 1];
        var b = buf[palette_offset + index * 3 + 2];
        pixels[op++] = r;
        pixels[op++] = g;
        pixels[op++] = b;
        pixels[op++] = 255;
      }
      --xleft;
    }
  };
}