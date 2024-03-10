    instructions.forEach((instruction) => {
      if (!instruction) {
        unsafe = true;
      } else {
        if (instruction.type === 'raydium') {
          // Whitelist raydium for now.
        } else if (instruction.type === 'mango') {
          // Whitelist mango for now.
        } else if (
          ['cancelOrder', 'matchOrders', 'cancelOrderV3'].includes(
            instruction.type,
          )
        ) {
          // It is always considered safe to cancel orders, match orders
        } else if (instruction.type === 'systemCreate') {
          let { newAccountPubkey } = instruction.data;
          if (!newAccountPubkey) {
            unsafe = true;
          } else {
            accountStates[newAccountPubkey.toBase58()] = states.CREATED;
          }
        } else if (['newOrder', 'newOrderV3'].includes(instruction.type)) {
          // New order instructions are safe if the owner is this wallet
          let { openOrdersPubkey, ownerPubkey } = instruction.data;
          if (ownerPubkey && owner.equals(ownerPubkey)) {
            accountStates[openOrdersPubkey.toBase58()] = states.OWNED;
          } else {
            unsafe = true;
          }
        } else if (instruction.type === 'initializeAccount') {
          // New SPL token accounts are only considered safe if they are owned by this wallet and newly created
          let { ownerPubkey, accountPubkey } = instruction.data;
          if (
            owner &&
            ownerPubkey &&
            owner.equals(ownerPubkey) &&
            accountPubkey &&
            accountStates[accountPubkey.toBase58()] === states.CREATED
          ) {
            accountStates[accountPubkey.toBase58()] = states.OWNED;
          } else {
            unsafe = true;
          }
        } else if (instruction.type === 'settleFunds') {
          // Settling funds is only safe if the destinations are owned
          let { basePubkey, quotePubkey } = instruction.data;
          if (!isOwned(basePubkey) || !isOwned(quotePubkey)) {
            unsafe = true;
          }
        } else if (instruction.type === 'closeAccount') {
          // Closing is only safe if the destination is owned
          let { sourcePubkey, destinationPubkey } = instruction.data;
          if (isOwned(destinationPubkey)) {
            accountStates[sourcePubkey.toBase58()] =
              states.CLOSED_TO_OWNED_DESTINATION;
          } else {
            unsafe = true;
          }
        } else {
          unsafe = true;
        }
      }
    });