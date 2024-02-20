function my_arg_test(sp)
{
	var ptr = heapU32[sp>>2];
	var size = heapU32[(sp+4)>>2];

	var arg = heapU32[ptr>>2];


	if (size == 4)
	{
	heap32[ptr>>2] = arg+4;

	arg = heap32[arg>>2];

	heap32[arg_test_local>>2] = arg;

	//dump('my_arg_test ' + arg + ' ' + ptr + '\n');

	}
	else
	{
		arg = (arg+7) & ~7;

		heap32[ptr>>2] = arg+8;

	//assert((arg&7)==0);
	var value0 = heap32[arg>>2];
	var value1 = heap32[(arg+4)>>2];
	//arg = llvm_readDouble(arg);

	//assert((arg_test_local&7)==0);

	heap32[arg_test_local>>2] = value0;
	heap32[(arg_test_local+4)>>2] = value1;

	//llvm_writeDouble(arg_test_local,arg);

	//dump('my_arg_test ' + arg + ' ' + ptr + '\n');


	}




	r_g0 = arg_test_local;
}