function setupNavierStokes()
{
    solver = new FluidField(null);
    solver.setResolution(128, 128);
    solver.setIterations(20);
    solver.setDisplayFunction(function(){});
    solver.setUICallback(prepareFrame);
    solver.reset();
}