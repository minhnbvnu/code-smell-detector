function transform_ss_to_ws(ss_point, ss_z) {
    ss_z = ss_z || 0;
    const cs_z = transform_ss_z_to_cs_z(ss_z);
    return transform_cs_to_ws(transform_ss_to_cs(ss_point, ss_z), cs_z);
}