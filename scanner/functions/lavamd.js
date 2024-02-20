function lavamd(boxes1d) {
    var time0, time1;

    // counters
    var i, j, k, l, m, n, expected_boxes1d = 6;

    // system memory
    var par_cpu = {}, dim_cpu = {}, box_cpu = [], rv_cpu = [], qv_cpu, fv_cpu = [], nh;
    var expectedAns = [4144561.0, 181665.0, -190914.0, 140373.0];

    // assign default values
    dim_cpu.cores_arg = 1;
    dim_cpu.boxes1d_arg = boxes1d || 1;

    if(dim_cpu.boxes1d_arg < 0) {
        console.log("ERROR: Wrong value to -boxes1d parameter, cannot be <=0");
        return;
    }
    console.log("Configuration used: cores = %d, boxes1d = %d\n", dim_cpu.cores_arg, dim_cpu.boxes1d_arg);

    // INPUTS
    par_cpu.alpha = 0.5;

    // DIMENSIONS
    // total number of boxes
    dim_cpu.number_boxes = dim_cpu.boxes1d_arg * dim_cpu.boxes1d_arg * dim_cpu.boxes1d_arg;

    // how many particles space has in each direction
    dim_cpu.space_elem = dim_cpu.number_boxes * NUMBER_PAR_PER_BOX;

    // BOX
    box_cpu = createArray(box_str, dim_cpu.number_boxes);   // allocate boxes
    // initialize number of home boxes
    nh = 0;

    // home boxes in z direction
    for(i=0; i<dim_cpu.boxes1d_arg; i++){
        // home boxes in y direction
        for(j=0; j<dim_cpu.boxes1d_arg; j++){
            // home boxes in x direction
            for(k=0; k<dim_cpu.boxes1d_arg; k++){

                // current home box
                box_cpu[nh].x = k;
                box_cpu[nh].y = j;
                box_cpu[nh].z = i;
                box_cpu[nh].number = nh;
                box_cpu[nh].offset = nh * NUMBER_PAR_PER_BOX;

                // initialize number of neighbor boxes
                box_cpu[nh].nn = 0;

                // neighbor boxes in z direction
                for(l=-1; l<2; l++){
                    // neighbor boxes in y direction
                    for(m=-1; m<2; m++){
                        // neighbor boxes in x direction
                        for(n=-1; n<2; n++){
                            // check if (this neighbor exists) and (it is not the same as home box)
                            if((((i+l)>=0 && (j+m)>=0 && (k+n)>=0)==true && ((i+l)<dim_cpu.boxes1d_arg && (j+m)<dim_cpu.boxes1d_arg && (k+n)<dim_cpu.boxes1d_arg)==true)   &&
                                    (l==0 && m==0 && n==0)==false){

                                // current neighbor box
                                box_cpu[nh].nei[box_cpu[nh].nn].x = (k+n);
                                box_cpu[nh].nei[box_cpu[nh].nn].y = (j+m);
                                box_cpu[nh].nei[box_cpu[nh].nn].z = (i+l);
                                box_cpu[nh].nei[box_cpu[nh].nn].number = (box_cpu[nh].nei[box_cpu[nh].nn].z * dim_cpu.boxes1d_arg * dim_cpu.boxes1d_arg) +
                                                                            (box_cpu[nh].nei[box_cpu[nh].nn].y * dim_cpu.boxes1d_arg) +
                                                                             box_cpu[nh].nei[box_cpu[nh].nn].x;
                                box_cpu[nh].nei[box_cpu[nh].nn].offset = box_cpu[nh].nei[box_cpu[nh].nn].number * NUMBER_PAR_PER_BOX;

                                // increment neighbor box
                                box_cpu[nh].nn = box_cpu[nh].nn + 1;
                            }
                        } // neighbor boxes in x direction
                    } // neighbor boxes in y direction
                } // neighbor boxes in z direction
                // increment home box
                nh = nh + 1;
            } // home boxes in x direction
        } // home boxes in y direction
    } // home boxes in z direction

    //  PARAMETERS, DISTANCE, CHARGE AND FORCE
    // input (distances)
    rv_cpu = createArray(space_mem, dim_cpu.space_elem); //(FOUR_VECTOR*)malloc(dim_cpu.space_mem);
    for(i=0; i<dim_cpu.space_elem; i=i+1){
        rv_cpu[i].v = (Math.commonRandom()%10 + 1) / 10.0;        // get a number in the range 0.1 - 1.0
        rv_cpu[i].x = (Math.commonRandom()%10 + 1) / 10.0;        // get a number in the range 0.1 - 1.0
        rv_cpu[i].y = (Math.commonRandom()%10 + 1) / 10.0;        // get a number in the range 0.1 - 1.0
        rv_cpu[i].z = (Math.commonRandom()%10 + 1) / 10.0;        // get a number in the range 0.1 - 1.0
    }

    // input (charge)
    qv_cpu = new Float64Array(dim_cpu.space_elem); // (fp*)malloc(dim_cpu.space_mem2);
    for(i=0; i<dim_cpu.space_elem; i=i+1){
        qv_cpu[i] = (Math.commonRandom()%10 + 1) / 10;            // get a number in the range 0.1 - 1.0
    }

    // output (forces)
    fv_cpu = createArray(space_mem, dim_cpu.space_elem); //(FOUR_VECTOR*)malloc(dim_cpu.space_mem);

    time0 = performance.now();

    kernel_cpu(par_cpu, dim_cpu, box_cpu, rv_cpu, qv_cpu, fv_cpu);

    var sum = space_mem();
    if (dim_cpu.boxes1d_arg == expected_boxes1d) {
        for(i=0; i<dim_cpu.space_elem; i=i+1) {
            sum.v += fv_cpu[i].v;
            sum.x += fv_cpu[i].x;
            sum.y += fv_cpu[i].y;
            sum.z += fv_cpu[i].z;
        }
        if(Math.round(sum.v) != expectedAns[0] || Math.round(sum.x) != expectedAns[1] || Math.round(sum.y) != expectedAns[2] || Math.round(sum.z) != expectedAns[3]) {
            console.log("Expected: [" + expectedAns[0] + ", " + expectedAns[1] + ", " + expectedAns[2] + ", " + expectedAns[3] + "]");
            console.log("Got: [" + sum.v + ", " + sum.x + ", " + sum.y + ", " + sum.z + "]");
        }
    } else {
        console.log("WARNING: no self-checking for input size of '%d'\n", dim_cpu.boxes1d_arg);
    }

    time1 = performance.now();
    console.log("Total time: " + (time1-time0) / 1000 + " s");
    return { status: 1,
             options: "lavamd(" + boxes1d + ")",
             time: (time1 - time0) / 1000 };
}