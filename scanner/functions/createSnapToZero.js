function createSnapToZero(tolerance) {
  const t = tolerance === undefined ? toRadians(5) : tolerance;
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function (rotation, isMoving) {
      if (isMoving || rotation === undefined) {
        return rotation;
      }

      if (Math.abs(rotation) <= t) {
        return 0;
      }
      return rotation;
    }
  );
}