function myglCreateRenderBuffer(sp) {
	var id = myglNewSlot();
    array_ids_ogl[id] = imandreel_gl.createRenderbuffer();

    r_g0 = id;
}