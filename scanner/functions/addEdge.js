function addEdge(Sx, Sy, Ex, Ey) {
            if (Sy < Ey) {
                // Update bounding box
                if (Sy < y0) { y0 = Sy; }
                if (Ey > y1) { y1 = Ey; }
                edgeArray.push([Sx, Sy, (Ex - Sx) / (Ey - Sy), Ey - Sy]);
            } else if (Sy > Ey) {
                addEdge(Ex, Ey, Sx, Sy);
            }
        }