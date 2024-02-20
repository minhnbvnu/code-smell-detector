function onReflectTarget(statErr) {
      if (statErr && statErr.code !== 'ENOENT') {
        return callback(statErr);
      }
      // If target doesn't exist, the vinyl will still carry the target stats.
      // Let's use those to determine which kind of dangling link to create.

      // This option provides a way to create a Junction instead of a
      // Directory symlink on Windows. This comes with the following caveats:
      // * NTFS Junctions cannot be relative.
      // * NTFS Junctions MUST be directories.
      // * NTFS Junctions must be on the same file system.
      // * Most products CANNOT detect a directory is a Junction:
      //    This has the side effect of possibly having a whole directory
      //    deleted when a product is deleting the Junction directory.
      //    For example, JetBrains product lines will delete the entire contents
      //    of the TARGET directory because the product does not realize it's
      //    a symlink as the JVM and Node return false for isSymlink.

      // This function is Windows only, so we don't need to check again
      var useJunctions = optResolver.resolve('useJunctions', file);

      var dirType = useJunctions ? 'junction' : 'dir';
      var type = !statErr && file.isDirectory() ? dirType : 'file';

      createLinkWithType(type);
    }