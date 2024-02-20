function qclass_to_string(qclass_num) {
    if (qclass_num === 255) {
        return "*";
    } else {
        return class_to_string(qclass_num);
    }
}