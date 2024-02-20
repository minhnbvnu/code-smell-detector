function supportedVersionToString({ backported, supported }) {
    if (supported == null) {
        return "(none yet)"
    }
    if (backported == null || backported.length === 0) {
        return supported
    }
    return `${supported} (backported: ^${backported.join(", ^")})`
}