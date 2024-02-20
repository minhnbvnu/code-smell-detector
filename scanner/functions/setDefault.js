async function setDefault(address) {
    if (!address) throw new Error('Specify new default address via --address');
    const walletStore = await new Nimiq.WalletStore();
    await walletStore.setDefault(Nimiq.Address.fromString(address));
    await walletStore.close();
    console.log('Set default to address:', Nimiq.Address.fromString(address).toUserFriendlyAddress());
}