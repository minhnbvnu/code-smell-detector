function write_zip_type(wb,opts){var o=opts||{};var z=write_zip(wb,o);switch(o.type){case"base64":return z.generate({type:"base64"});case"binary":return z.generate({type:"string"});case"buffer":return z.generate({type:"nodebuffer"});case"file":return _fs.writeFileSync(o.file,z.generate({type:"nodebuffer"}));default:throw new Error("Unrecognized type "+o.type)}}