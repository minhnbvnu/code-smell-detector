function PDFSecurity(permissions, userPassword, ownerPassword, fileId) {
  this.v = 1; // algorithm 1, future work can add in more recent encryption schemes
  this.r = 2; // revision 2

  // set flags for what functionalities the user can access
  let protection = 192;
  permissions.forEach(function(perm) {
    if (typeof permissionOptions.perm !== "undefined") {
      throw new Error("Invalid permission: " + perm);
    }
    protection += permissionOptions[perm];
  });

  // padding is used to pad the passwords to 32 bytes, also is hashed and stored in the final PDF
  this.padding =
    "\x28\xBF\x4E\x5E\x4E\x75\x8A\x41\x64\x00\x4E\x56\xFF\xFA\x01\x08" +
    "\x2E\x2E\x00\xB6\xD0\x68\x3E\x80\x2F\x0C\xA9\xFE\x64\x53\x69\x7A";
  let paddedUserPassword = (userPassword + this.padding).substr(0, 32);
  let paddedOwnerPassword = (ownerPassword + this.padding).substr(0, 32);

  this.O = this.processOwnerPassword(paddedUserPassword, paddedOwnerPassword);
  this.P = -((protection ^ 255) + 1);
  this.encryptionKey = md5Bin(
    paddedUserPassword +
      this.O +
      this.lsbFirstWord(this.P) +
      this.hexToBytes(fileId)
  ).substr(0, 5);
  this.U = rc4(this.encryptionKey, this.padding);
}