function class_to_string(class_num) {
    switch (class_num) {
    case 1:
        return "IN";
    case 2:
        return "CS";
    case 3:
        return "CH";
    case 4:
        return "HS";
    default:
        return "Unknown (" + class_num + ")";
    }
}