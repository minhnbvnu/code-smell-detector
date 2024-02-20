function pop_bottommost_panel(from)
{
	min_order=parseInt(from[0].dataset.panelOrder);
	min_index=0;
	for(i=0;i<from.length;i++)
	{
		actual_order=parseInt(from[i].dataset.panelOrder);
		if(actual_order<min_order)
		{
			min_index=i;
			min_order=actual_order;
		}
	}
	to_return=from[min_index];
	from.splice(min_index,1);
	return to_return;
}