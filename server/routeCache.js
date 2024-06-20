import NodeCache from 'node-cache'

const cache = new NodeCache()

export const routeCache = (duration) => (req, res, next) => {
  if (!req.method === 'GET') {
    console.log('Cannot cache non-Get')
    return next()
  }
  const key = req.originalUrl
  const cachedResponse = cache.get(key)
  if (cachedResponse) {
    console.log(`Cache triggered for ${key}`)
    res.send(cachedResponse)
  } else {
    console.log(`Cache miss for ${key}`)
    res.originalSend = res.send
    res.send = body => {
      res.originalSend(body)
      cache.set(key, body, duration)
    }
    next()
  }
}