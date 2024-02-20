function checkCompressedPayload(t, payload, prop, cb) {
  helper.decodeServerlessPayload(t, payload, (err, decoded) => {
    if (err) {
      return t.error(err)
    }

    const data = decoded.data[prop]
    t.ok(data, `compressed payload includes ${prop} prop`)

    for (const key in decoded.data) {
      if (!decoded.data[key].length) {
        t.fail(`payload data.${key} property is empty`)
      }
    }

    cb(decoded.data[prop])
  })
}