function myglBindRenderbuffer(sp)
{
    var target = heap32[sp >> 2]; sp += 4;
    var renderbuffer_id = heap32[sp >> 2]; sp += 4;

    var renderbuffer = array_ids_ogl[renderbuffer_id];

    imandreel_gl.bindRenderbuffer(target,renderbuffer);

}