function transform_cs_to_ss(cs_point, cs_z) {
    cs_z = cs_z || 0;
    return xy((cs_point.x + (cs_z * $skewXZ)) * $scaleX + $offsetX,
              (cs_point.y + (cs_z * $skewYZ)) * $scaleY + $offsetY);
}