function $addGraphicsCommand(cmd) {
    if (is_nan(cmd.z)) { $error('NaN z value in graphics command'); }
    
    cmd.clipX1 = $clipX1;
    cmd.clipY1 = $clipY1;
    cmd.clipX2 = $clipX2;
    cmd.clipY2 = $clipY2;

    // Offset subsequent commands to get a unique z value for each,
    // and stable sort ordering. The offset value must be orders of
    // magnitude less than the quadplay epsilon value to avoid
    // confusion for programmers with z ordering.
    cmd.z     += $graphicsCommandList.length * $Math.sign($scaleZ) * 1e-10;
    
    $graphicsCommandList.push(cmd);
}