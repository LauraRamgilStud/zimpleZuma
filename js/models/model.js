export class Node {
  constructor(payload) {
    this.payload = payload;
    this.prev = null;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // insert first node
  addFirst(payload) {
    const newNode = new Node(payload);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  // insert last node
  addLast(payload) {
    const newNode = new Node(payload);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.size++;
  }

  // insert at index
  addAtIndex(payload, index) {
    //If out of bounds, add to last
    if (index > 0 && index > this.size) {
      this.add(payload);
      return;
    }

    // If first index
    if (index === 0) {
      this.addFirst(payload);
      return;
    }

    const node = new Node(payload);
    let current, prev;

    // set current to first
    current = this.head;
    let count = 0;

    while (count < index) {
      prev = current; // Node before index
      count++;
      current = current.next; // Node after index
    }

    node.next = current;
    node.prev = prev;
    prev.next = node;
    current.prev = node;

    this.size++;
  }

  // get at index
  getAt(index) {
    /* //If out of bounds, return last
    if (index > 0 && index > this.size) {
      this.add(payload);
      return;
    } */

    let current = this.head;
    let count = 0;

    while (current) {
      if (count == index) {
        console.log(current.data);
      }
      count++;
      current = current.next;
    }
    return null;
  }

  // remove at index
  removeAt(index) {
    // If out of bounds remove tail
    if (index > 0 && index > this.size) {
      this.removeTail();
      return;
    }

    let current = this.head;
    let prev;
    let count = 0;

    //Remove first
    if (index === 0) {
      this.removeHead();
    } else {
      while (count < index) {
        count++;
        prev = current;
        current = current.next;
      }

      prev.next = current.next;
      current.next.prev = prev;
    }
    this.size--;
  }

  // clear list
  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // print list data
  print() {
    let current = this.head;
    while (current) {
      console.log(`
      -------------------------
      Payload: ${current.payload}
      Prev: ${current.prev?.payload}
      Next: ${current.next?.payload}
      --------------------------

      `);
      current = current.next;
    }
  }

  // get index by payload
  indexOf(payload) {
    let current = this.head;
    let index = 0;
    while (current !== null) {
      if (current.payload === payload) {
        return index;
      }
      current = current.next;
      index++;
    }
    return;
  }

  // insert after index
  insertAfterNode(payload, existingNode) {
    const newNode = {
      payload: payload,
      prev: existingNode,
      next: existingNode.next,
    };
    // TODO: Doesn't handle if this is the last node
    existingNode.next.prev = newNode;
    existingNode.next = newNode;

    this.size++;
    return newNode;
  }

  // insertBefore index
  insertBeforeNode(payload, existingNode) {
    const newNode = {
      payload: payload,
      prev: existingNode.prev,
      next: existingNode,
    };
    // TODO: Doesn't handle if this is the first node
    existingNode.prev.next = newNode;
    existingNode.prev = newNode;

    this.size++;
    return newNode;
  }

  // get first element
  head() {
    return this.head;
  }

  // get last element
  tail() {
    return this.tail;
  }

  // remove first element
  removeHead() {
    if (this.head) {
      this.head = this.head.next;
      this.head.prev = null;
      this.size--;
    }
  }

  // remove last element
  removeTail() {
    if (this.tail) {
      this.tail = this.tail.prev;
      this.tail.next = null;
      this.size--;
    }
  }

  insertAfterNode(payload, existingNode) {
    const newNode = new Node(payload);
    newNode.next = existingNode.next;
    newNode.prev = existingNode;
    if (existingNode.next) {
      existingNode.next.prev = newNode;
    } else {
      this.tail = newNode;
    }
    existingNode.next = newNode;
    this.size++;
  }

  insertBeforeNode(payload, existingNode) {
    const newNode = new Node(payload);
    newNode.next = existingNode;
    newNode.prev = existingNode.prev;
    if (existingNode.prev) {
      existingNode.prev.next = newNode;
    } else {
      this.head = newNode;
    }
    existingNode.prev = newNode;
    this.size++;
  }

  removeNode(node) {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
    this.size--;
  }

  nodeAt(index) {
    let current = this.head;
    let count = 0;
    while (current !== null && count < index) {
      current = current.next;
      count++;
    }
    return current;
  }

  swapNodes(nodeA, nodeB) {
    if (nodeA === nodeB) return;

    const tempPrevA = nodeA.prev;
    const tempNextA = nodeA.next;

    nodeA.prev = nodeB.prev;
    nodeA.next = nodeB.next;

    nodeB.prev = tempPrevA;
    nodeB.next = tempNextA;

    nodeA.prev ? (nodeA.prev.next = nodeA) : (this.head = nodeA);
    nodeA.next ? (nodeA.next.prev = nodeA) : (this.tail = nodeA);
    nodeB.prev ? (nodeB.prev.next = nodeB) : (this.head = nodeB);
    nodeB.next ? (nodeB.next.prev = nodeB) : (this.tail = nodeB);
  }
}
