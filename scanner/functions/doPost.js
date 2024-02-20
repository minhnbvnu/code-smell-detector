function doPost() {
    return post(URI, {
        payload: JSON.stringify({
            email: 'fake@email.com',
            sku: '001',
            token: 'just_a_fake_token',
        }),
    })
}