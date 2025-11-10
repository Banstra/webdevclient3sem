function convertTemperature(value, direction) {
  if (direction === 'toC') {
    const celsius = (value - 32) * 5 / 9;
    return `${Math.round(celsius)} C`;
  } else if (direction === 'toF') {
    const fahrenheit = (value * 9 / 5) + 32;
    return `${Math.round(fahrenheit)} F`;
  } else {
    return 'Неверное направление преобразования';
  }
}

function convert() {
  const tempValue = parseFloat(document.getElementById('tempInput').value);
  const direction = document.getElementById('directionSelect').value;
  const resultDiv = document.getElementById('result');

  if (isNaN(tempValue)) {
    resultDiv.textContent = 'Пожалуйста, введите корректное числовое значение температуры.';
    return;
  }

  const result = convertTemperature(tempValue, direction);
  resultDiv.textContent = `Результат: ${result}`;
}

function triangular(A, B, C) {
   S = 0
   p = 0
  if (!isNaN(A)&& !isNaN(B) && !isNaN(C)) {
    if (A + B > C && B + C > A && C + A > B) {
    console.log('треугольник существует')
    p = (A + B + C) / 2
    S = Math.sqrt(p*(p-A)*(p-B)*(p-C))
    console.log('периметр = ',p, 'площадь =', S )

  }
  else {
    console.log('треугольник не существует')
  }
  }
  else {
    console.log('введите числа')
  }
  
}

function FizzBuzz(n) {
  if (!isNaN(n)) {
    for (let i = 0; i <= n; i++) {
  if (i % 5 === 0 && i !== 0) {
    console.log(`${i} fizz buzz`);
  } else if (i % 2 === 0) {
    console.log(`${i} buzz`);
  } else {
    console.log(`${i} fizz`);
  }
  }


}
  else {
    console.log('введите число')
}
}

function createTree(layers) {
  let tree = '';
  if (!isNaN(layers)) {
    for (let i = 1; i <= layers; i++) {
      const symbol = (i % 2 === 1) ? '*' : '#';
      tree += symbol.repeat(i) + '\n';
    }
    tree += '||';
  
    console.log(tree);
  }
   else {
    console.log('введите число')
}
}

function isDivisibleByBoth(n, x, y) {
  if (!isNaN(n) && !isNaN(x) && !isNaN(y) ) {
    return n % x === 0 && n % y === 0;
  }
   else {
    console.log('введите число')
}
}

function countSandwiches(bread, cheese) {
  if (!isNaN(bread) && !isNaN(cheese)) {
    const maxByBread = Math.floor(bread / 2);
    const maxByCheese = cheese;
    console.log(Math.min(maxByBread, maxByCheese))
  }
   else {
    console.log('введите число')
}
}

function absValue(x) {
  if (!isNaN(x)) {
    if (x < 0) {
      console.log(-x);
    } else {
      console.log(x);
    }
  }
   else {
    console.log('введите число')
}
}

function randomNumber(min, max) {
 
  console.log(Math.floor(Math.random() * (max - min) + min))
}

function sampleArray(arr, count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = randomNumber(0, arr.length - 1);
    result.push(arr[randomIndex]);
    
  }
  console.log(result)
}
function myFilterArray(arr, letter) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (isFirstLetter(arr[i], letter)) {
      result.push(arr[i]);
    }
  }
  return result;
}

function isFirstLetter(name, letter) {
  return name.startsWith(letter)
}


function toBeCloseTo(num1, num2, epsilon = Number.EPSILON) {
  
  console.log(Math.abs(num1 - num2) < epsilon)
}

