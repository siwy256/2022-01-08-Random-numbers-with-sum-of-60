/* eslint no-console:"off" */

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findIndexOfMinimalValue(array) {
  if (!Array.isArray(array)) {
    throw new Error('findIndexOfMinimalValue: array isn\'t an Array type.');
  }

  let minimal = Infinity;
  let index = 0;
  array.forEach((element, i) => {
    if (element < minimal) {
      minimal = element;
      index = i;
    }
  });

  return index;
}

function findIndexOfMaximalValue(array) {
  if (!Array.isArray(array)) {
    throw new Error('findIndexOfMinimalValue: array isn\'t an Array type.');
  }

  let maximal = -Infinity;
  let index = 0;
  array.forEach((element, i) => {
    if (element > maximal) {
      maximal = element;
      index = i;
    }
  });

  return index;
}

function getRandomValuesFromRange() {
  const from = 1;
  const to = 60;

  const count = 6;

  let sum = 0;
  let arrayRandom = [];

  for (let i = 1; i <= count; i += 1) {
    const random = getRandomValue(from, to);
    arrayRandom.push(random);

    sum += random;
  }

  const ratio = to / sum;

  arrayRandom = arrayRandom.map((item) => Math.round(ratio * item));
  arrayRandom = arrayRandom.map((item) => {
    if (item === 0) {
      return 1;
    }

    return item;
  });

  const checkSum = arrayRandom.reduce((previous, current) => previous + current, 0);

  if (checkSum > to) {
    const difference = checkSum - to;
    const indexOfMaxmimalValue = findIndexOfMaximalValue(arrayRandom);
    arrayRandom[indexOfMaxmimalValue] -= difference;
  }

  if (checkSum < to) {
    const difference = to - checkSum;
    const indexOfMinimalValue = findIndexOfMinimalValue(arrayRandom);
    arrayRandom[indexOfMinimalValue] += difference;
  }

  const lastCheckSum = arrayRandom.reduce((previous, current) => previous + current, 0);
  if (lastCheckSum !== to) {
    throw new Error(`Still not equal. Sum is: ${lastCheckSum}`);
  }

  return arrayRandom;
}

for (let i = 0; i < 100; i += 1) {
  const array = getRandomValuesFromRange();
  const sum = array.reduce((previous, current) => previous + current, 0);
  // array.sort((a, b) => a - b);
  console.log(array, sum);
}
