function myglFramebufferTexture2D (sp)
{
  var target = heap32[sp>>2];sp+=4;
  var attachment = heap32[sp>>2];sp+=4;
  var textarget = heap32[sp>>2];sp+=4;
  var texture_id = heap32[sp>>2];sp+=4;
  var level = heap32[sp>>2];sp+=4;

  var texture = array_ids_ogl[texture_id];

  imandreel_gl.framebufferTexture2D(target, attachment, textarget, texture, level);


}