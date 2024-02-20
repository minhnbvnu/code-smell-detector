function _fnVisbleColumns( oSettings )
	{
		return $( _pluck( oSettings.aoColumns, 'nTh' ) ).filter(':visible').length;
	}