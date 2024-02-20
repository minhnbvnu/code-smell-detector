function runSRAD(niter,lambda) {
    var output = 0;
    image = new Float32Array(Ne);
    for(i=0; i<Ne; i++) {
        image[i] = Math.exp(data[i]/255);
    }
    time0 = performance.now();
    SRAD(niter,lambda);
    time1 = performance.now();
    writeImage();

    for (i=0; i<Nr; i++) {
        print(i);
        output = output + data[i];
    }

    if (niter === 500 & lambda === 1) {
        if (output !== expectedOutput) {
            console.log("ERROR: expected output of '"+expectedOutput+"' but received '"+output+"' instead");
        }
    } else {
        console.log("WARNING: No self-checking step for niter '" + niter + "' and lambda '" + lambda + "'");
    }

    console.log("Time: " + ((time1-time0)/1000) + " s");
    return { status: 1,
             options: "runSRAD(" + [niter, lambda].join(",") + ")",
             time: (time1 - time0) / 1000 };
}