function cryptoHash(str)
{
    let hash = crypto.createHash('sha512');
    let data = hash.update(str, 'utf-8');
    let hash_str = data.digest('base64');
    return hash_str;
}