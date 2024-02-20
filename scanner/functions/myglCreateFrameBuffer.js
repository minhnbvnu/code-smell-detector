function myglCreateFrameBuffer(sp) {
	var id = myglNewSlot();
    array_ids_ogl[id] = imandreel_gl.createFramebuffer();

    r_g0 = id;
}