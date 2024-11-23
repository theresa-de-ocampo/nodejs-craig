# buffer.toString() vs. StringDecoder

Both `buffer.toString()` and `StringDecoder` class can be used to convert a Buffer object to a string. However, there are some differences between the two approaches.

## buffer.toString()

- This is a method provided by the Buffer class.
- It converts the entire buffer to a string.
- It converts any unknown character codes to the Unicode character `65533 (�)`

## StringDecoder

- The `StringDecoder` class is part of the `string_decoder` module.
- It allows you to decode a Buffer incrementally, handling multi-byte characters more efficiently.
- It is particularly useful when working with streams, as it can handle incomplete characters at the end of the chunk.
- That is, it is useful when the end of the buffer only has partial character encoding.
- The `StringDecoder` keeps track of any partial characters at the end of the buffer, ensuring they are properly handled when additional data is appended.
