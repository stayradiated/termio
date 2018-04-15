import toStream from 'pull-stream-to-stream'

import createTermioStream from './termio'

const createStream = (opts) => {
  const stream = toStream(createTermioStream(opts))
  return stream
}

export default createStream
