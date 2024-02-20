function eventTrigger ( api, type, args, any )
{
	if ( any && ! api.flatten().length ) {
		return;
	}

	args.unshift( api );

	$(api.table().node()).triggerHandler( type+'.dt', args );
}