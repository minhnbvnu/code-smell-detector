function getIsRtlScrollbarOnLeft() {
        if (isRtlScrollbarOnLeft === null) {
            isRtlScrollbarOnLeft = computeIsRtlScrollbarOnLeft();
        }
        return isRtlScrollbarOnLeft;
    }