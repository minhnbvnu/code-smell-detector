function xlml_normalize(d){if(has_buf&&Buffer.isBuffer(d))return d.toString("utf8");if(typeof d==="string")return d;throw"badf"}