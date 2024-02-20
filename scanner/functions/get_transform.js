function get_transform() {
    return {pos:  xy($offsetX, $offsetY),
            dir:  xy($scaleX, $scaleY),
            z:    $offsetZ,
            z_dir: $scaleZ,
            skew: xy($skewXZ, $skewYZ)
           };
}