import Html from './html'

const createHtmlStream = () => {
  const html = new Html()

  return (read) => (abort, cb) => {
    return read(abort, (err, data) => {
      if (err === true) {
        cb(null, html.end())
        cb(err)
        return
      }

      if (err != null) {
        return cb(err)
      }

      cb(null, html.write(data))
    })
  }
}

export default createHtmlStream
