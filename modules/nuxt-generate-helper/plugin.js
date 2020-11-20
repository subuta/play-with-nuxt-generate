const opts = <%= serialize(options) %>

export default function ({ app, ssrContext }, inject) {
  // Expose $origin for fetching.
  inject('origin', () => {
    // Use getOrigin only if not isDev and isStatic(SSG)
    if (!app.context.isDev && app.context.isStatic) {
      return opts.getOrigin()
    }
    // Get origin from server/browser params otherwise.
    let origin
    if (process.server) {
      origin = `http://${ssrContext.req.headers.host}`
    } else {
      origin = location.origin
    }
    return origin
  })
}
