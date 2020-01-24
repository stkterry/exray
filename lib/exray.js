class Exray extends Array {

  log() {
    return console.log(this);
  }

  pluck(key) {
    return this.map(item => item[key]);
  }

  tap(fn) {
    fn(this);
    return this;
  }

  pipe(fn) {
    return fn(this);
  }

  mod(fn) {
    for (const [idx, el] of this.entries()) {
      this[idx] = fn(el, idx);
    }
    return this;
  }

  groupBy(prop) {
    return this.reduce((res, obj) => {
      const id = obj[prop];
      res[id] = res[id] || new this.constructor;

      res[id].push({...obj});

      return res;
    }, {})
  }

  split(size) {
    let splits = new this.constructor;

    for (let i = 0, len = this.length; i < len; i+=size) {
      let split = this.slice(i, i + size);
      splits.push(split);
    }

    return splits;
  }

  prepend(...dat) {
    return new this.constructor(...dat, ...this);
  }

  unique(fn = ((el) => true)) {
    return this.reduce((uniques, el) => {
      if (!uniques.includes(el) && fn(el) ) uniques.push(el);

      return uniques;
    }, new this.constructor)
  }

  pad(fPadCount, padVal = 0, rPadCount = 0) {
    let padded = new this.constructor;
    for (let n = 0; n < fPadCount; n++) padded.push(padVal);
    for (let el of this) padded.push(el);
    for (let n = 0; n < rPadCount; n++) padded.push(padVal);

    return padded;
  }


  static times(length, fn) {
    return this.from({ length }, (val, n) => fn(n));
  }
}

module.exports = Exray;


