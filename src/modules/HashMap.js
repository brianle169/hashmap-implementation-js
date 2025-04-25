import LinkedList from "./LinkedList";

export default class HashMap {
  #loadFactor;
  #capacity;
  #buckets;
  #length = 0;

  constructor(loadFactor = 0.8, capacity = 16) {
    this.#loadFactor = loadFactor;
    this.#capacity = capacity;
    // initialize the buckets
    this.#buckets = new Array(this.#capacity);
    for (let i = 0; i < this.#capacity; i++) {
      this.#buckets[i] = new LinkedList();
    }
  }

  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.#capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.#hash(key);
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.has(key)) {
      const node = this.#buckets[index].find(key);
      node.value = value;
    } else {
      this.#buckets[index].append({ key, value });
      this.#length++;
    }

    // grow the hash map if the load factor is exceeded
    if (this.#length > this.#capacity * this.#loadFactor) {
      this.#grow();
    }
  }

  #grow() {
    const entries = this.entries();
    this.#capacity *= 2;
    this.clear();
    this.#buckets = new Array(this.#capacity);
    for (let i = 0; i < this.#capacity; i++) {
      this.#buckets[i] = new LinkedList();
    }
    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      this.set(key, value);
    }
  }

  get(key) {
    const index = this.#hash(key);
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.has(key)) {
      const node = this.#buckets[index].find(key);
      return node.value;
    }
    return null;
  }

  has(key) {
    const index = this.#hash(key);
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    return this.#buckets[index].contains(key);
  }

  remove(key) {
    const index = this.#hash(key);
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (!this.has(key)) {
      return false;
    }
    this.#buckets[index].removeAt(this.getNodeIndex(key));
    this.#length--;
    return true;
  }

  // Assume the key exists
  getNodeIndex(key) {
    const index = this.#hash(key);
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    let count = 0;
    let current = this.#buckets[index].getHead();
    while (current) {
      if (current.key === key) {
        break;
      }
      current = current.next;
      count++;
    }
    return count;
  }

  length() {
    return this.#length;
  }

  clear() {
    for (let i = 0; i < this.#buckets.length; i++) {
      this.#buckets[i].clear();
    }
    this.#length = 0;
  }

  keys() {
    const keys = [];
    for (let i = 0; i < this.#buckets.length; i++) {
      let current = this.#buckets[i].getHead();
      while (current) {
        keys.push(current.key);
        current = current.next;
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (let i = 0; i < this.#buckets.length; i++) {
      let current = this.#buckets[i].getHead();
      while (current) {
        values.push(current.value);
        current = current.next;
      }
    }
    return values;
  }

  entries() {
    const entries = [];
    for (let i = 0; i < this.#buckets.length; i++) {
      let current = this.#buckets[i].getHead();
      while (current) {
        entries.push([current.key, current.value]);
        current = current.next;
      }
    }
    return entries;
  }

  testHash(key) {
    console.log(`'${key}' - ${this.#hash(key)}`);
  }

  toString() {
    let str = "";
    for (let i = 0; i < this.#capacity; i++) {
      str += `#${i} `;
      for (let j = 0; j < this.#buckets[i].size; j++) {
        str += `[${this.#buckets[i].at(j).data.key} - ${this.#buckets[i].at(j).data.value}] `;
      }
      str += "\n";
    }
    return str;
  }
}
