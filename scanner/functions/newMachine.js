function newMachine()
{
    window.canvas.clear(bgColor);

    machine = new Machine(
        4,              // Num states
        8,              // Num symbols
        256,            // Tape length
        canvasWidth,
        canvasHeight
    );

    lastPosX = machine.posX | 0;
    lastPosY = machine.posY | 0;
}