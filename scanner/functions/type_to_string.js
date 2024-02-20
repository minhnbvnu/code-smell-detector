function type_to_string(type_num) {
    switch (type_num) {
    case 1:
        return "A";
    case 2:
        return "NS";
    case 3:
        return "MD";
    case 4:
        return "MF";
    case 5:
        return "CNAME";
    case 6:
        return "SOA";
    case 7:
        return "MB";
    case 8:
        return "MG";
    case 9:
        return "MR";
    case 10:
        return "NULL";
    case 11:
        return "WKS";
    case 12:
        return "PTR";
    case 13:
        return "HINFO";
    case 14:
        return "MINFO";
    case 15:
        return "MX";
    case 16:
        return "TXT";
    case 28:
        return "AAAA";
    default:
        return ("Unknown (" + type_num + ")");
    }
}