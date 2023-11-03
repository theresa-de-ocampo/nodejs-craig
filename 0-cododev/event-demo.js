const EventEmitter = require('events')

class Emitter extends EventEmitter {}

const myEmitter = new Emitter()

myEmitter.on('foo', () => {
  console.log('Event Fired')
})

myEmitter.emit('foo')
