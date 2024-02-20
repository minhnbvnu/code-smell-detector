function fakeSpawn(cmd, args, cb){
      expect(cmd).to.not.be.empty;
      expect(args).to.be.an.array;
      console.log(cmd, args.join(' '));
      cb();
    }