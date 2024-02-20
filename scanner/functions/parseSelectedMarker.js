function parseSelectedMarker(xmlDoc)
{
	var markerListHTML = '<ol>';
	var comment = '';
	var inPoint = '';
	var outPoint = '';
	var duration = '';
	var typeClass = '';
	var name = '';

	if (xmlDoc != null)
	{
		markerList = xmlDoc.getElementsByTagName('marker');

		var markerHTML = '';
		for (var i=0; i<markerList.length; i++)
		{
			comment = '';
			inPoint = '';
			outPoint = '';
			duration = '';
			typeClass = '';
			name = '';
			var propList = markerList[i].getElementsByTagName('prop.pair');
			for (var j=0; j<propList.length; j++)
			{
				var key = '';
				var value = '';

				if (propList[j].getElementsByTagName('key').length > 0)
				{
					key = propList[j].getElementsByTagName('key')[0].textContent;
				}

				if (propList[j].getElementsByTagName('string').length > 0)
				{
					value = propList[j].getElementsByTagName('string')[0].textContent;
				}
				
				if (key == 'comment')
				{
					comment = value;
				}
				else if (key == 'startTime')
				{
					inPoint = value;
				}
				else if (key == 'duration')
				{
					duration = value;
				}
				else if (key == 'name')
				{
					name = value;
				}
				else if (key == 'type')
				{
					if (value == 'InOut')
					{
						typeClass = 'markerColor_subclip';
					}
					else if (value == 'Comment')
					{
						typeClass = 'markerColor_comment';
					}
					else if (value == 'FLVCuePoint')
					{
						typeClass = 'markerColor_flashCuePoint';
					} 
					else if (value == 'Web Link')
					{
						typeClass = 'markerColor_webLink';
					} 
					else if (value == 'Chapter')
					{
						typeClass = 'markerColor_chapter';
					}
					else if (value == 'Speech')
					{
						typeClass = 'markerColor_speechTranscription';
					}
					else
					{
						typeClass = 'markerColor_customer';
					}
				}
				else
				{
					// do nothing
				}
			}

			markerHTML =  '<li>'
			markerHTML += ' <ul>';
			markerHTML += '		<li class="markerColor '+typeClass+'"></li>';
			markerHTML += '		<li class="markerTime">';
			markerHTML += '			<ul>';
			markerHTML += '				<li>';
			markerHTML += '					<label>In: '+inPoint+'</label>';
			markerHTML += '				</li>';
			markerHTML += '				<li>';
			markerHTML += '					<label>Dur:'+duration+'</label>';
			markerHTML += '				</li>';
			markerHTML += '			</ul>';
			markerHTML += '		</li>';
			markerHTML += '		<li class="description">';
			markerHTML += '			<p>'+name+'</p>';
			markerHTML += '			<textarea disabled="disabled">'+encodeHTML(comment)+'</textarea>';
			markerHTML += '		</li>';					
			markerHTML += '	</ul>';
			markerHTML += '</li>';		
		}

		markerListHTML += markerHTML + '</ol>';
	}

	return markerListHTML;
}