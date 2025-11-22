 function job() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("работа сделана");
        }, 2000);
      });
    }

    const btn = document.getElementById('startBtn');
    const resultDiv = document.getElementById('result');

    btn.addEventListener('click', () => {
      resultDiv.textContent = '';

      job().then(message => {
        resultDiv.textContent = message;
      });
    });




   

    
    // Функция getData принимает вероятность ошибки и строку, возвращает функцию
  function getData(errorProbability = 0.5, dataStr = 'test') {
    const data = `Синтетические данные: ${dataStr}`;

    return function(num) {
      if (typeof num !== 'number' || Number.isNaN(num)) {
        throw new Error('Аргумент должен быть числом и не NaN');
      }

      if (Math.random() < errorProbability) {
        return null;
      } else {
        return data;
      }
    };
  }

  function GetError() {
    const output = document.getElementById('output');

    // Получаем значения из input, парсим число для вероятности
    const inputNumRaw = document.getElementById('inputNumber').value;
    const inputNum = parseFloat(inputNumRaw);

    // Получаем строку из второго input
    const inputText = document.getElementById('inputText').value;

    // Проверка валидности вероятности
    if (isNaN(inputNum) || inputNum < 0 || inputNum > 1) {
      output.textContent = 'Ошибка: вероятность должна быть числом от 0 до 1';
      output.style.color = 'red';
      return;
    }

    // Создаём функцию с текущими параметрами
    const fn = getData(inputNum, inputText);

    try {
      // Для проверки передаём число, например 42 (можно сделать ввод)
      const result = fn(42);

      if (result === null) {
        output.textContent = 'Ошибка: данные не получены (null)';
        output.style.color = 'red';
      } else {
        output.textContent = result;
        output.style.color = 'black';
      }
    } catch (e) {
      output.textContent = `Ошибка: ${  e.message}`;
      output.style.color = 'red';
    }
}
  

 // Описание предметов
  const items = {
    wood: {
      name: "Дерево",
      craftingTime: 1000,
      requiredItems: [],
      failProbability: 0.1
    },
    stick: {
      name: "Палка",
      craftingTime: 1500,
      requiredItems: ["wood"],
      failProbability: 0.1
    },
    ironOre: {
      name: "Железная руда",
      craftingTime: 2000,
      requiredItems: [],
      failProbability: 0.15
    },
    ironIngot: {
      name: "Железный слиток",
      craftingTime: 2500,
      requiredItems: ["ironOre"],
      failProbability: 0.2
    },
    pickaxe: {
      name: "Кирка",
      craftingTime: 3000,
      requiredItems: ["stick", "ironIngot"],
      failProbability: 0.25
    }
  };

  // Инвентарь: сколько предметов доступно
  const inventory = {
    wood: 0,
    stick: 0,
    ironOre: 0,
    ironIngot: 0,
    pickaxe: 0
  };

  // Состояние создания (true - предмет создаётся)
  const craftingState = {
    wood: false,
    stick: false,
    ironOre: false,
    ironIngot: false,
    pickaxe: false
  };

  const itemsContainer = document.getElementById('itemsContainer');
  const inventoryDisplay = document.getElementById('inventoryDisplay');

  // Обновление отображения инвентаря
  function updateInventoryDisplay() {
    inventoryDisplay.innerHTML = '';
    for (const key in inventory) {
      const span = document.createElement('span');
      span.textContent = `${items[key].name}: ${inventory[key]}`;
      inventoryDisplay.appendChild(span);
    }
  }

  // Создаём блоки для каждого предмета с кнопкой и статусом
  function createItemBlocks() {
    for (const key in items) {
      const block = document.createElement('div');
      block.className = 'item-block';
      block.id = `block-${key}`;

      const btn = document.createElement('button');
      btn.textContent = `Создать ${items[key].name}`;
      btn.id = `btn-${key}`;
      btn.onclick = () => craft(key);

      const status = document.createElement('div');
      status.className = 'status';
      status.id = `status-${key}`;

      block.appendChild(btn);
      block.appendChild(status);
      itemsContainer.appendChild(block);
    }
  }

  // Функция создания предмета с учётом зависимостей
  async function craft(itemKey) {
    const item = items[itemKey];
    const btn = document.getElementById(`btn-${itemKey}`);
    const status = document.getElementById(`status-${itemKey}`);

    // Блокируем кнопку, чтобы не запускать параллельно
    btn.disabled = true;
    craftingState[itemKey] = true;

    status.textContent = 'Проверка зависимостей...';
    status.className = 'status';

    // Проверяем и создаём необходимые предметы
    for (const reqKey of item.requiredItems) {
      if (inventory[reqKey] < 1) {
        status.textContent = `Создаём зависимость: ${items[reqKey].name}`;
        try {
          await craft(reqKey);
        } catch (e) {
          status.textContent = `Не удалось создать зависимость: ${items[reqKey].name}`;
          status.className = 'status fail';
          btn.disabled = false;
          craftingState[itemKey] = false;
          throw new Error(`Не удалось создать зависимость ${items[reqKey].name}`);
        }
      }
    }

    // После создания зависимостей уменьшаем их количество в инвентаре
    for (const reqKey of item.requiredItems) {
      inventory[reqKey]--;
    }
    updateInventoryDisplay();

    // Начинаем создание самого предмета
    status.textContent = 'Создание...';
    status.className = 'status progress';

    // Ждём craftingTime
    await new Promise(resolve => setTimeout(resolve, item.craftingTime));

    // Проверяем вероятность провала
    if (Math.random() < item.failProbability) {
      status.textContent = 'Неудача';
      status.className = 'status fail';
      btn.disabled = false;
      craftingState[itemKey] = false;
      throw new Error(`Создание ${item.name} провалилось`);
    } else {
      // Успешное создание
      inventory[itemKey]++;
      updateInventoryDisplay();
      status.textContent = 'Успех';
      status.className = 'status success';
      btn.disabled = false;
      craftingState[itemKey] = false;
      
    }
  }

  // Инициализация интерфейса
  createItemBlocks();
  updateInventoryDisplay();