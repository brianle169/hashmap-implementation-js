import Node from "./Node";

export default class LinkedList {
  constructor() {
    this.head = null;
  }

  append(data) {
    const newNode = new Node(data, null);
    let current = this.head;
    if (!current) {
      this.head = newNode;
      return;
    }
    // traversing the list
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  prepend(data) {
    // empty list
    if (!this.head) {
      this.head = new Node(data, null);
      return;
    }
    const newNode = new Node(data, this.head);
    this.head = newNode;
  }

  get size() {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }

  getHead() {
    const head = this.head;
    return head;
  }

  getTail() {
    if (this.size === 1) {
      return this.head;
    }
    if (this.size === 0) {
      return null;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    return current;
  }

  at(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    let current = this.head;
    let count = 0;
    while (count < index) {
      current = current.next;
      count++;
    }
    return current;
  }

  pop() {
    if (this.size === 0) {
      return;
    }
    if (this.size === 1) {
      this.head = null;
      return;
    }
    let current = this.head;
    while (current.next.next) {
      current = current.next;
    }
    current.next = null;
  }

  contains(data) {
    return this.find(data) !== null;
  }

  find(value) {
    let current = this.head;
    if (!current) {
      return null;
    }
    while (current.next && current.data.key !== value) {
      current = current.next;
    }
    if (current.data.key === value) {
      return current;
    }
    return null;
  }

  toString() {
    let current = this.head;
    let str = ``;
    while (current) {
      str += `[${current.data}] -> `;
      current = current.next;
    }
    str += `X`;
    return str;
  }

  insertAt(value, index) {
    if (index < 0 || index >= this.size) {
      return;
    }
    if (index === 0) {
      this.prepend(value);
      return;
    }
    let current = this.head;
    let count = 0;
    while (count < index - 1) {
      current = current.next;
      count++;
    }
    current.next = new Node(value, current.next);
  }

  removeAt(index) {
    if (index < 0 || index >= this.size) {
      return;
    }
    if (this.size === 1) {
      this.head = null;
      return;
    }
    let current = this.head;
    let count = 0;
    while (count < index - 1) {
      current = current.next;
      count++;
    }
    current.next = current.next.next;
  }

  clear() {
    this.head = null;
  }
}
