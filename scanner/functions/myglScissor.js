function myglScissor(sp)
{
    var x = heap32[sp >> 2]; sp += 4;
    var y = heap32[sp >> 2]; sp += 4;
    var width = heap32[sp >> 2]; sp += 4;
    var height = heap32[sp >> 2]; sp += 4;

    imandreel_gl.scissor(x,y,width,height);
}