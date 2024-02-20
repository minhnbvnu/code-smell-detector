function diff_match_patch() {

  // Defaults.
  // Redefine these in your program to override the defaults.

  // Number of seconds to map a diff before giving up.  (0 for infinity)
  this.Diff_Timeout = 1.0;
  // Cost of an empty edit operation in terms of edit characters.
  this.Diff_EditCost = 4;
  // The size beyond which the double-ended diff activates.
  // Double-ending is twice as fast, but less accurate.
  this.Diff_DualThreshold = 32;
  // Tweak the relative importance (0.0 = accuracy, 1.0 = proximity)
  this.Match_Balance = 0.5;
  // At what point is no match declared (0.0 = perfection, 1.0 = very loose)
  this.Match_Threshold = 0.5;
  // The min and max cutoffs used when computing text lengths.
  this.Match_MinLength = 100;
  this.Match_MaxLength = 1000;
  // Chunk size for context length.
  this.Patch_Margin = 4;

  /**
   * Compute the number of bits in an int.
   * The normal answer for JavaScript is 32.
   * @return {number} Max bits
   */
  function getMaxBits() {
    var maxbits = 0;
    var oldi = 1;
    var newi = 2;
    while (oldi != newi) {
      maxbits++;
      oldi = newi;
      newi = newi << 1;
    }
    return maxbits;
  }
  // How many bits in a number?
  this.Match_MaxBits = getMaxBits();
}