function initHuffmanTbl() {
    YDC_HT = computeHuffmanTbl(
      std_dc_luminance_nrcodes,
      std_dc_luminance_values
    );
    UVDC_HT = computeHuffmanTbl(
      std_dc_chrominance_nrcodes,
      std_dc_chrominance_values
    );
    YAC_HT = computeHuffmanTbl(
      std_ac_luminance_nrcodes,
      std_ac_luminance_values
    );
    UVAC_HT = computeHuffmanTbl(
      std_ac_chrominance_nrcodes,
      std_ac_chrominance_values
    );
  }