import { Transform as TransformStream } from 'stream'
import Splinter from 'splinter'
import through from 'through'
import escapeHtml from 'escape-html'

import Ansi from './ansi'
import Html from './html'
import Token from './token'
import * as wrapper from './wrapper'

const createTermioStream = (opts) => {
  const stream = new TransformStream()

  const ansi = Ansi.createStream()
  const html = Html.createStream()
  const token = Token.createStream()

  const splinter = new Splinter((chunk) => {
    console.log('CHUNK', chunk)
    return chunk.type
  })

  splinter.match('ansi')
    .pipe(through(function (chunk) {
      console.log('QUEUE', chunk.value)
      this.queue(chunk.value)
    }))
    .pipe(ansi)
    .pipe(html)
    .on('data', (data) => {
      console.log('PUSH', data.toString())
      stream.push(data)
    })

  splinter.match('text')
    .pipe(through(function (chunk) {
      console.log('QUEUE', chunk.value)
      this.queue(escapeHtml(chunk.value))
    }))
    .on('data', (data) => {
      console.log('PUSH', data.toString())
      stream.push(data)
    })

  token.pipe(splinter)

  stream._transform = (chunk, encoding, done) => {
    token.write(chunk)
    done()
  }

  if (opts && opts.header) {
    stream.push(wrapper.before)
    stream._flush = (done) => {
      stream.push(wrapper.after)
      done()
    }
  }

  return stream
}

export default createTermioStream
