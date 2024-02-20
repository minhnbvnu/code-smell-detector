function WebPRiffParser(src, src_off) {
    var imagearray = {};
    var i = 0;
    var alpha_chunk = false;
    var alpha_size = 0;
    var alpha_offset = 0;
    imagearray["frames"] = [];
    if (memcmp(src, src_off, "RIFF", 4)) return;
    src_off += 4;
    GetLE32(src, src_off) + 8;
    src_off += 8;

    while (src_off < src.length) {
      var fourcc = GetTag(src, src_off);
      src_off += 4;

      var payload_size = GetLE32(src, src_off);
      src_off += 4;
      var payload_size_padded = payload_size + (payload_size & 1);

      switch (fourcc) {
        case "VP8 ":
        case "VP8L":
          if (typeof imagearray["frames"][i] === "undefined")
            imagearray["frames"][i] = {};
          var obj = imagearray["frames"][i];
          obj["src_off"] = alpha_chunk ? alpha_offset : src_off - 8;
          obj["src_size"] = alpha_size + payload_size + 8;
          //var rgba = webpdecoder.WebPDecodeRGBA(src,(alpha_chunk?alpha_offset:src_off-8),alpha_size+payload_size+8,width,height);
          //imagearray[i]={'rgba':rgba,'width':width[0],'height':height[0]};
          i++;
          if (alpha_chunk) {
            alpha_chunk = false;
            alpha_size = 0;
            alpha_offset = 0;
          }
          break;
        case "VP8X":
          var obj = (imagearray["header"] = {});
          (obj["feature_flags"] = src[src_off]);
          var src_off_ = src_off + 4;
          (obj["canvas_width"] = 1 + GetLE24(src, src_off_));
          src_off_ += 3;
          (obj["canvas_height"] =
            1 + GetLE24(src, src_off_));
          src_off_ += 3;
          break;
        case "ALPH":
          alpha_chunk = true;
          alpha_size = payload_size_padded + 8;
          alpha_offset = src_off - 8;
          break;

        case "ANIM":
          var obj = imagearray["header"];
          (obj["bgcolor"] = GetLE32(src, src_off));
          src_off_ = src_off + 4;

          (obj["loop_count"] = GetLE16(src, src_off_));
          src_off_ += 2;
          break;
        case "ANMF":
          var temp = 0;
          var obj = (imagearray["frames"][i] = {});
          obj["offset_x"] = 2 * GetLE24(src, src_off);
          src_off += 3;
          obj["offset_y"] = 2 * GetLE24(src, src_off);
          src_off += 3;
          obj["width"] = 1 + GetLE24(src, src_off);
          src_off += 3;
          obj["height"] = 1 + GetLE24(src, src_off);
          src_off += 3;
          obj["duration"] = GetLE24(src, src_off);
          src_off += 3;
          temp = src[src_off++];
          obj["dispose"] = temp & 1;
          obj["blend"] = (temp >> 1) & 1;
          break;
      }
      if (fourcc != "ANMF") src_off += payload_size_padded;
    }
    return imagearray;
  }