function getVbrCodecProfile(vbrScale) {
    return 'V' + (100 - vbrScale) / 10;
}