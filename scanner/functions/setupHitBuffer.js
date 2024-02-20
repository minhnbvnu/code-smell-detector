function setupHitBuffer(){
	hitbuffer = document.getElementById('hitbuffer');
	hitbuffer.width = grCanvasSize;
	hitbuffer.height = grCanvasSize;
	hitbuffer.style.visibility = 'hidden';
	var ctx = hitbuffer.getContext('2d');
	for(i in nodes) hitBufferNode(ctx, i, nodes[i].segs);
}