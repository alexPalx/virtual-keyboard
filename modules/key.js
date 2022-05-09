export default class Key {
  constructor(key, keyAlt, kCode, newClass = '') {
    this.key = key;
    this.keyAlt = keyAlt;
    this.kCode = kCode;
    this.newClass = newClass;
  }
}
