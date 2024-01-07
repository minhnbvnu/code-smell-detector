function intersectsLinearRing(
  flatCoordinates,
  offset,
  end,
  stride,
  extent,
) {
  if (intersectsLineString(flatCoordinates, offset, end, stride, extent)) {
    return true;
  }
  if (
    linearRingContainsXY(
      flatCoordinates,
      offset,
      end,
      stride,
      extent[0],
      extent[1],
    )
  ) {
    return true;
  }
  if (
    linearRingContainsXY(
      flatCoordinates,
      offset,
      end,
      stride,
      extent[0],
      extent[3],
    )
  ) {
    return true;
  }
  if (
    linearRingContainsXY(
      flatCoordinates,
      offset,
      end,
      stride,
      extent[2],
      extent[1],
    )
  ) {
    return true;
  }
  if (
    linearRingContainsXY(
      flatCoordinates,
      offset,
      end,
      stride,
      extent[2],
      extent[3],
    )
  ) {
    return true;
  }
  return false;
}