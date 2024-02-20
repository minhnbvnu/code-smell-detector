function get_clip() {
    return {
        corner:  {x:$clipX1, y:$clipY1},
        size:    {x:$clipX2 - $clipX1 + 1, y:$clipY2 - $clipY1 + 1},
        z:       $clipZ1,
        z_size:  $clipZ2 - $clipZ1 + 1
    };
}