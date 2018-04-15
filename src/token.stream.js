import Token from './token'

const createTokenStream = () => {
  const token = new Token()

  // transform pull stream
  return (read) => (abort, cb) => {
    read(abort, (err, data) => {
      if (err != null) {
        return cb(err)
      }

      const output = token.write(data)
      output.forEach((token) => cb(null, token))
    })
  }
}

export default createTokenStream
