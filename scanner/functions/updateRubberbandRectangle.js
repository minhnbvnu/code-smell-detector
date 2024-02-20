function updateRubberbandRectangle(loc) {
   rubberbandW = Math.abs(loc.x - mousedown.x);
   rubberbandH = Math.abs(loc.y - mousedown.y);

   if (loc.x > mousedown.x) rubberbandUlhc.x = mousedown.x;
   else                     rubberbandUlhc.x = loc.x;

   if (loc.y > mousedown.y) rubberbandUlhc.y = mousedown.y;
   else                     rubberbandUlhc.y = loc.y;
}