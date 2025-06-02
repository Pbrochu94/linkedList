class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }
  append = (value) => {
    let newNode = new Node(value);
    if (!this.head && !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.nextNode = newNode;
      this.head = newNode;
    }
    this.length++;
  };
  prepend = (value) => {
    let newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    }
    newNode.nextNode = this.tail;
    this.tail = newNode;
    this.length++;
  };
  at = (index) => {
    if (!this.tail && !this.head) {
      return "The list is empty.";
    }
    if (index > this.length) {
      return `There is not that many data in the list.(The list contains ${this.length} elements)`;
    }
    let currentNode = this.tail;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.nextNode;
    }
    return currentNode.value;
  };
  pop = () => {
    if (!this.tail && !this.head) {
      return "The list is empty.";
    }
    let currentNode = this.tail;

    for (let i = 0; i < this.length - 2; i++) {
      currentNode = currentNode.nextNode;
    }
    currentNode.nextNode = null;
    this.head = currentNode;
    this.length--;
  };
  contains = (value) => {
    if (!this.tail && !this.head) {
      return "The list is empty.";
    }
    let currentNode = this.tail;
    for (let i = 0; i < this.length; i++) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  };
  find = (value) => {
    if (!this.tail && !this.head) {
      return "The list is empty.";
    }
    let index = 1;
    let currentNode = this.tail;
    for (let i = 0; i < this.length; i++) {
      if (currentNode.value === value) {
        return index;
      }
      index++;
      currentNode = currentNode.nextNode;
    }
    return null;
  };
  toString = () => {
    if (!this.tail && !this.head) {
      return "The list is empty.";
    }
    let currentNode = this.tail;
    let stringList = "";
    for (let i = 0; i < this.length; i++) {
      stringList += ` (${currentNode.value}) ->`;
      currentNode = currentNode.nextNode;
    }
    return stringList + ` null`;
  };
  insertAt = (newNode, index) => {
    if (!this.tail && !this.head && index === 1) {
      this.tail = newNode;
      this.head = newNode;
      return;
    }
    if (index > this.length + 1 || index < 0) {
      return "Out of bound";
    }
    if (index === this.length || (index <= 0 && this.head && this.tail)) {
      return `Can't insert at end/start of the list, use append or prepend for that.`;
    }
    let currentNode = this.tail;

    for (let i = 0; i < index; i++) {
      if (i === index - 1) {
        newNode.nextNode = currentNode.nextNode;
        currentNode.nextNode = newNode;
      }
      currentNode = currentNode.nextNode;
    }
    this.length++;
  };
  removeAt = (index) => {
    if (!this.head && !this.tail) {
      return "theres no node to remove.";
    }
    if (index === this.length) {
      return `Can't remove at end of list, use pop for that`;
    }
    let currentNode = this.tail;
    if (this.length <= 1) {
      this.tail = null;
      return;
    }
    if (index === 0 && list.length !== 1) {
      this.tail = this.tail.nextNode;
    }
    for (let i = 1; i < index; i++) {
      if (i === index - 1) {
        currentNode.nextNode = currentNode.nextNode.nextNode;
      }
      currentNode = currentNode.nextNode;
    }
    this.length--;
  };
  clear = () => {
    list.head = null;
    list.tail = null;
    list.length = 0;
  };
}

let list = new LinkedList();
let nodeClass = Node;

export { list, nodeClass };
