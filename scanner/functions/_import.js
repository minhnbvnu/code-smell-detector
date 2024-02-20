async function _import(type, format) {
    let entropy;
    switch (format) {
        case 'words': {
            const words = await new Promise((resolve) => {
                rl.question('Enter 24-word phrase: ', resolve);
            });
            if (words.split(' ').length !== 24) {
                throw new Error('Invalid number of words.');
            }
            const mnemonicType = Nimiq.MnemonicUtils.getMnemonicType(words);
            if (type === 'auto') {
                switch (mnemonicType) {
                    case Nimiq.MnemonicUtils.MnemonicType.LEGACY:
                        type = 'legacy';
                        break;
                    case Nimiq.MnemonicUtils.MnemonicType.BIP39:
                        type = 'bip39';
                        break;
                    default:
                        throw new Error('Unable to auto-discover private key type. Specify through --type option.');
                }
            }
            if (type === 'legacy') {
                if (mnemonicType !== Nimiq.MnemonicUtils.MnemonicType.LEGACY) {
                    throw new Error('24-word phrase is not of specified type.');
                }
                entropy = Nimiq.MnemonicUtils.legacyMnemonicToEntropy(words);
            } else if (type === 'bip39') {
                if (mnemonicType !== Nimiq.MnemonicUtils.MnemonicType.BIP39) {
                    throw new Error('24-word phrase is not of specified type.');
                }
                entropy = Nimiq.MnemonicUtils.mnemonicToEntropy(words);
            } else {
                throw new Error('24-word phrase is not of specified type.');
            }
            break;
        }
        case 'hex': {
            if (type === 'auto') throw new Error('Unable to auto-discover private key type with hex encoding. Specify through --type option.');
            const hex = await new Promise((resolve) => {
                rl.question('Enter private key as hex: ', resolve);
            });
            entropy = new Nimiq.Entropy(Nimiq.BufferUtils.fromHex(hex));
            break;
        }
        case 'base64': {
            if (type === 'auto') throw new Error('Unable to auto-discover private key type with base64 encoding. Specify through --type option.');
            const hex = await new Promise((resolve) => {
                rl.question('Enter private key as base64: ', resolve);
            });
            entropy = new Nimiq.Entropy(Nimiq.BufferUtils.fromBase64(hex));
            break;
        }
    }
    switch (type) {
        case 'legacy': {
            const privateKey = new Nimiq.PrivateKey(entropy.serialize());
            const keyPair = Nimiq.KeyPair.derive(privateKey);
            const wallet = new Nimiq.Wallet(keyPair);
            const walletStore = await new Nimiq.WalletStore();
            await walletStore.put(wallet);
            await walletStore.close();
            console.log('Imported wallet for address:', wallet.address.toUserFriendlyAddress());
            break;
        }
        case 'bip39': {
            const masterKey = entropy.toExtendedPrivateKey();
            const privateKey = masterKey.derivePath("m/44'/242'/0'/0'").privateKey;
            const keyPair = Nimiq.KeyPair.derive(privateKey);
            const wallet = new Nimiq.Wallet(keyPair);
            const walletStore = await new Nimiq.WalletStore();
            await walletStore.put(wallet);
            await walletStore.close();
            console.log('Imported wallet for address:', wallet.address.toUserFriendlyAddress());
            break;
        }
        default: {
            throw new Error('Unknown key type');
        }
    }
}