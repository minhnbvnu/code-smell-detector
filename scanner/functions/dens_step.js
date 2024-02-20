function dens_step(x, x0, u, v, dt)
    {
        addFields(x, x0, dt);
        diffuse(0, x0, x, dt );
        advect(0, x, x0, u, v, dt );
    }