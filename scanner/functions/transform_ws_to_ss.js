function transform_ws_to_ss(ws_point, ws_z) {
    ws_z = ws_z || 0;
    return transform_cs_to_ss(transform_ws_to_cs(ws_point, ws_z),
                              transform_ws_z_to_cs_z(ws_z));
}