import Ansi from './ansi'
import { shallowEqual } from 'fast-equals'

const createAnsiStream = () => {
  const ansi = new Ansi()

  let last = {}

  return (read) => (abort, cb) => {
    return read(abort, (err, data) => {
      if (err != null) {
        cb(err, null)
        return
      }

      if (Array.isArray(data)) {
        data.map((code) => ansi.write(code))
      } else {
        ansi.write(data)
      }

      const attrs = ansi.attrs()
      if (!shallowEqual(attrs, last)) {
        last = attrs
        cb(null, attrs)
      }
    })
  }
}

export default createAnsiStream
