export default class Node {
  data = null;

  next = null;

  constructor(data, next) {
    this.data = data;
    this.next = next;
  }

  get key() {
    return this.data.key;
  }

  get value() {
    return this.data.value;
  }

  set value(value) {
    this.data.value = value;
  }
}
