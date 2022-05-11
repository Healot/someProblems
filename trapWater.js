// https://leetcode.com/problems/trapping-rain-water/

const trap = function (height) {
  let sum = 0;

  const leftArr = [0];
  const rightArr = [];
  rightArr[height.length - 1] = 0;

  for (let i = 1; i < height.length; i++) {
    leftArr.push(Math.max(height[i - 1], leftArr[i - 1]));
  }

  for (let i = height.length - 2; i >= 0; i--) {
    rightArr[i] = Math.max(height[i + 1], rightArr[i + 1]);
  }

  for (let i = 0; i < height.length; i++) {
    let left = leftArr[i];
    let right = rightArr[i];
    let min = Math.min(left, right);

    if (min - height[i] > 0) {
      sum += min - height[i];
    }
  }

  return sum;
};
