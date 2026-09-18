export const onRequestGet = async () => {
  const target = 'ryvexmc.pvp.srv.br:21403'
  const upstream = `https://api.mcsrvstat.us/3/${target}`

  try {
    const response = await fetch(upstream, {
      headers: {
        'User-Agent': 'RyvexMC-Website/1.0 (server status)'
      },
      cf: { cacheTtl: 60, cacheEverything: true }
    } as RequestInit)

    if (!response.ok) throw new Error(`status_${response.status}`)
    const data: any = await response.json()

    const body = {
      online: Boolean(data.online),
      host: 'ryvexmc.pvp.srv.br',
      port: 21403,
      players: {
        online: Number(data.players?.online ?? 0),
        max: Number(data.players?.max ?? 0)
      },
      version: data.version ?? data.protocol?.name ?? null,
      software: data.software ?? null,
      motd: Array.isArray(data.motd?.clean) ? data.motd.clean : [],
      checkedAt: new Date().toISOString()
    }

    return new Response(JSON.stringify(body), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=30, s-maxage=60',
        'access-control-allow-origin': '*'
      }
    })
  } catch {
    return new Response(JSON.stringify({
      online: false,
      host: 'ryvexmc.pvp.srv.br',
      port: 21403,
      players: { online: 0, max: 0 },
      version: null,
      software: null,
      motd: [],
      checkedAt: new Date().toISOString(),
      unavailable: true
    }), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=15, s-maxage=30',
        'access-control-allow-origin': '*'
      }
    })
  }
}
