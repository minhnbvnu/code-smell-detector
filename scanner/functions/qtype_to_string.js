function qtype_to_string(qtype_num) {
    switch (qtype_num) {
    case 252:
        return "AXFR";
    case 253:
        return "MAILB";
    case 254:
        return "MAILA";
    case 255:
        return "*";
    default:
        return type_to_string(qtype_num);
    }
}