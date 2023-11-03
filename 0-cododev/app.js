// Create a simple web server such that when someone sends a request,
// we're going to read the contents of the text file, and send it back to the client.

// This module will allow us to listen on a specific port
// which will enable us to receive and send http requests.
const http = require('http')
const fs = require('fs/promises')
const path = require('path')

const server = http.createServer(async (request, response) => {
  const contentBuffer = await fs.readFile(path.join(__dirname, 'text.txt'))

  response.statusCode = 200
  response.setHeader('Content-Type', 'text-plain')
  response.end(contentBuffer.toString('utf8'))
})

const PORT = 8000
server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`)
})
