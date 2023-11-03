const buffer = Buffer.alloc(8)
buffer.write('st', 'utf-8')

const buffer2 = Buffer.from('string', 'utf-8')
console.log(buffer2)
