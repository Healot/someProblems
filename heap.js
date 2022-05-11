// Top K Frequent Elements
// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]

const topKFrequent = function (nums, k) {
  const dict = {};

  for (const num of nums) {
    if (!dict[num]) {
      dict[num] = 0;
    }

    dict[num] += 1;
  }

  const array = Object.entries(dict);

  const heap = new Heap(array, comparator);
  const result = [];

  for (let i = 0; i < k; i++) {
    result.push(+heap.pop()[0]);
  }

  return result;
};

function comparator(a, b) {
  return a[1] - b[1];
}

class Heap {
  constructor(array, comparator) {
    this.arr = [];
    this.comparator = comparator;
    for (let elem of array) {
      this.add(elem);
    }
  }

  add(value) {
    this.arr.push(value);
    let index = this.arr.length - 1;

    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (this.comparator(this.arr[index], this.arr[parent]) <= 0) {
        break;
      }

      const temp = this.arr[index];
      this.arr[index] = this.arr[parent];
      this.arr[parent] = temp;
      index = parent;
    }
    return this;
  }

  pop() {
    const top = this.arr[0];

    this.arr[0] = this.arr.pop();
    let index = 0;

    while (true) {
      const parent = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      let maxIndex = parent;

      if (
        left < this.arr.length &&
        this.comparator(this.arr[left], this.arr[maxIndex]) > 0
      ) {
        maxIndex = left;
      }

      if (
        right < this.arr.length &&
        this.comparator(this.arr[right], this.arr[maxIndex]) > 0
      ) {
        maxIndex = right;
      }

      if (maxIndex === parent) {
        break;
      }

      const temp = this.arr[parent];
      this.arr[parent] = this.arr[maxIndex];
      this.arr[maxIndex] = temp;

      index = maxIndex;
    }

    return top;
  }
}
