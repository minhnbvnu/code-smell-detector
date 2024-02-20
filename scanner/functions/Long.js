function Long(low, high, unsigned) {

  /**
   * The low 32 bits as a signed value.
   * @type {number}
   */
  this.low = low | 0;

  /**
   * The high 32 bits as a signed value.
   * @type {number}
   */
  this.high = high | 0;

  /**
   * Whether unsigned or not.
   * @type {boolean}
   */
  this.unsigned = !!unsigned;
}