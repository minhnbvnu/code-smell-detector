function validatePayload (headers, payload) {
  if (
    !payload.r ||
    payload.r.length < 4 ||
    payload.r.length > 64 ||
    !payload.r.match(/^[A-Za-z0-9_-]+$/)
  ) {
    return new Response('Bad room id' + payload.r, { status: 400, headers })
  }

  if (payload.d) {
    if (
      !payload.x ||
      typeof payload.x !== 'number' ||
      payload.x > 24 * 60 * 60 * 1000
    ) {
      return new Response('Bad expiration', { status: 400, headers })
    }

    // Validate timestamp - note date is of last I/O in worker
    if (
      !payload.t ||
      typeof payload.t !== 'number' ||
      Math.abs(payload.t - new Date().getTime()) > 10 * 60 * 1000
    ) {
      return new Response('Bad timestamp', { status: 400, headers })
    }

    if (!payload.k || payload.k.length > 64) {
      return new Response('Bad context id', { status: 400, headers })
    }

    // Registering an entry
    const d = payload.d

    if (d.length !== 6) {
      return new Response('Bad data length', { status: 400, headers })
    }

    // Validate session id + client id + context id
    if (!d[0] || d[0].length > 64) {
      return new Response('Bad session id', { status: 400, headers })
    }

    if (!d[1] || d[1].length > 64) {
      return new Response('Bad client id', { status: 400, headers })
    }

    if (typeof d[2] !== 'boolean') {
      return new Response('Bad is symmetric', { status: 400, headers })
    }

    if (!d[3] || d[3].length !== 44) {
      return new Response('Bad dtls', { status: 400, headers })
    }

    if (!d[4] || typeof d[4] !== 'number') {
      return new Response('Bad joined at timestamp', { status: 400, headers })
    }

    if (
      !d[5] ||
      typeof d[5] !== 'object' ||
      d[5].find(ip => !ip.match(IPV4_REGEX) && !ip.match(IPV6_REGEX))
    ) {
      return new Response('Bad reflexive IPs', { status: 400, headers })
    }

    try {
      atob(d[3])
    } catch (e) {
      return new Response('Bad base64 encoding', { status: 400, headers })
    }
  }
}