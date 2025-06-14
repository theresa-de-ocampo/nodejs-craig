import { Readable } from "stream";

export default class TextStream extends Readable {
  constructor(options) {
    super(options);
    this.sentences = [];
  }

  _read(size) {
    if (this.sentences.length > 0) {
      this.push(null);
    } else {
      this.push(this.sentences.shift());
    }
  }

  addSentence(sentence) {
    this.sentences.push(sentence);
  }
}
