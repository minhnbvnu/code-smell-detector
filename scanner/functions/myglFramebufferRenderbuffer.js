function myglFramebufferRenderbuffer (sp)
{
  var target = heap32[sp>>2];sp+=4;
  var attachment = heap32[sp>>2];sp+=4;
  var renderbuffertarget = heap32[sp>>2];sp+=4;
  var renderbuffer_id = heap32[sp>>2];sp+=4;

    var renderbuffer = array_ids_ogl[renderbuffer_id];

    imandreel_gl.framebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer);

}