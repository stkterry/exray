class Exray extends Array {

  log() {
    return console.log(this);
  }

  pluck(key) {
    return this.map(item => item[key]);
  }

  static times(length, fn) {
    return this.from({ length }, (val, n) => fn(n));
  }
}

module.exports = Exray;


