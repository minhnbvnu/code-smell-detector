function place_panels(function_apply)
{
	if(function_apply == undefined) function_apply = function(x){};
	var hoffset=0; //added this because the first panel should not have such great gap below
	var left_col=[];
	var right_col=[];
	var plist=e("openwebrx-panels-container").children;
	for(i=0;i<plist.length;i++)
	{
		c=plist[i];
		if(c.className=="openwebrx-panel")
		{
			if(c.openwebrxHidden)
			{
				c.style.display="none";
				continue;
			}
			c.style.display="block";
			c.openwebrxPanelTransparent=(!!c.dataset.panelTransparent);
			newSize=c.dataset.panelSize.split(",");
			if (c.dataset.panelPos=="left") { left_col.push(c); }
			else if(c.dataset.panelPos=="right") { right_col.push(c); }
			c.style.width=newSize[0]+"px";
			//c.style.height=newSize[1]+"px";
			if(!c.openwebrxPanelTransparent) c.style.margin=panel_margin.toString()+"px";
			else c.style.marginLeft=panel_margin.toString()+"px";
			c.openwebrxPanelWidth=parseInt(newSize[0]);
			c.openwebrxPanelHeight=parseInt(newSize[1]);
		}
	}

	y=hoffset; //was y=0 before hoffset
	while(left_col.length>0)
	{
		p=pop_bottommost_panel(left_col);
		p.style.left="0px";
		p.style.bottom=y.toString()+"px";
		p.style.visibility="visible";
		y+=p.openwebrxPanelHeight+((p.openwebrxPanelTransparent)?0:3)*panel_margin;
		if(function_apply) function_apply(p);
        //console.log(p.id, y, p.openwebrxPanelTransparent);
	}
	y=hoffset;
	while(right_col.length>0)
	{
		p=pop_bottommost_panel(right_col);
		p.style.right=(e("webrx-canvas-container").offsetWidth-e("webrx-canvas-container").clientWidth).toString()+"px"; //get scrollbar width
		p.style.bottom=y.toString()+"px";
		p.style.visibility="visible";
        y+=p.openwebrxPanelHeight+((p.openwebrxPanelTransparent)?0:3)*panel_margin;
		if(function_apply) function_apply(p);
	}
}