function myglCreateUniformArrays()
{
	if ( uniformArraysCreated == 0 )
	{
		for(var i=0; i<256;i++ )
		{
			uniformArrays2[i] = new Float32Array(i*2);
			uniformArrays3[i] = new Float32Array(i*3);
			uniformArrays4[i] = new Float32Array(i*4);
		}
		uniformArraysCreated = 1;
	}
}