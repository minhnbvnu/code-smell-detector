function transform_ss_to_cs(ss_point, ss_z) {
    ss_z = ss_z || 0;
    const cs_z = transform_ss_z_to_cs_z(ss_z);
    return xy((ss_point.x - $offsetX) / $scaleX - cs_z * $skewXZ,
              (ss_point.y - $offsetY) / $scaleY - cs_z * $skewYZ);
}