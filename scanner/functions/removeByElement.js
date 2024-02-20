function removeByElement(arrayName,arrayElement)
 {
    for(var i=0; i<arrayName.length;i++ )
     {
        if(arrayName[i]==arrayElement)
		{
            arrayName.splice(i,1);
			return;
		}
      }
  }