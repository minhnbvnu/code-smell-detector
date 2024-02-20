function getLoc(programElement, gl, name) {
    gl.useProgram(programElement.program);
    const loc = gl.getUniformLocation(programElement.program, name);
    if (loc === null) {
        throw new Error("could not get the " + name + " uniform location");
    }
    return loc;
}