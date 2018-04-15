import pull from 'pull-stream'
import escapeHtml from 'escape-html'

import createAnsiStream from './ansi.stream'
import createHtmlStream from './html.stream'
import createTokenStream from './token.stream'
import * as wrapper from './wrapper'

const createWrapperStream = () => {
  let first = true
  return (read) => (abort, cb) => {
    return read(abort, (err, data) => {
      if (err === true) {
        cb(null, wrapper.after)
        return
      }
      if (err != null) {
        return cb(err)
      }
      if (first) {
        cb(null, wrapper.before)
        first = false
        return
      }
      return cb(null, data)
    })
  }
}

const createTokenHandlerStream = () => {
  const ansiStream = createAnsiStream()
  const htmlStream = createHtmlStream()

  const codeStream = (read) => htmlStream(ansiStream(read))
  const textStream = pull.map((value) => escapeHtml(value))

  return (read) => (abort, cb) => {
    return read(abort, (err, data) => {
      if (err === true) {
        codeStream((_, cb) => cb(err))(abort, cb)
        return
      }

      if (err != null) {
        return cb(err)
      }

      switch (data.type) {
        case 'ansi':
          return codeStream((_, cb) => cb(null, data.value))(abort, cb)
        case 'text':
          return textStream((_, cb) => cb(null, data.value))(abort, cb)
        default:
          throw new Error(`Unexpected type: "${data.type}"`)
      }
    })
  }
}

const createTermioStream = (opts) => {
  const streams = [
    createTokenStream(),
    createTokenHandlerStream(),
  ]

  if (opts && opts.wrapper) {
    streams.push(createWrapperStream())
  }

  return pull.pull.apply(pull, streams)
}

export default createTermioStream
