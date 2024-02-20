function testNMI(n){
        initChip();

        mWrite(0x0000, 0x38); // set carry
        mWrite(0x0001, 0x4c); // jump to test code
        mWrite(0x0002, 0x06);
        mWrite(0x0003, 0x23);

        mWrite(0x22ff, 0x38); // set carry
        mWrite(0x2300, 0xea);
        mWrite(0x2301, 0xea);
        mWrite(0x2302, 0xea);
        mWrite(0x2303, 0xea);
        mWrite(0x2304, 0xb0); // branch carry set to self
        mWrite(0x2305, 0xfe);

        mWrite(0x2306, 0xb0); // branch carry set to self
        mWrite(0x2307, 0x01);
        mWrite(0x2308, 0x00); // brk should be skipped
        mWrite(0x2309, 0xa9); // anything
        mWrite(0x230a, 0xde); // anything
        mWrite(0x230b, 0xb0); // branch back with page crossing
        mWrite(0x230c, 0xf2);

        mWrite(0xc018, 0x40); // nmi handler

        mWrite(0xfffa, 0x18); // nmi vector
        mWrite(0xfffb, 0xc0);
        mWrite(0xfffc, 0x00); // reset vector
        mWrite(0xfffd, 0x00);

        for(var i=0;i<n;i++){step();}
        setLow('nmi');
        chipStatus();
        for(var i=0;i<8;i++){step();}
        setHigh('nmi');
        chipStatus();
        for(var i=0;i<16;i++){step();}
}