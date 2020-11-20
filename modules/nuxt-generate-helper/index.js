import path from 'path'

const getOrigin = () => {
  // Defaults to PORT env or 3000.
  const port = process.env.__NUXT_PORT__ || process.env.PORT || 3000
  return `http://localhost:${port}`
}

export {
  getOrigin
}

export default function () {
  // SEE: https://github.com/nuxt/nuxt.js/issues/7597#issuecomment-652961387
  this.nuxt.hook('listen', (server, listener) => {
    // Expose nuxt instance's port for plugin.
    process.env.__NUXT_PORT__ = listener.port
  })
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: { getOrigin }
  })
}
