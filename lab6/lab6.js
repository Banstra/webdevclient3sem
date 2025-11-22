/* eslint-disable no-alert */
 
let vm = null;

  const versionInput = document.getElementById('versionInput');
  const createBtn = document.getElementById('createBtn');
  const versionDisplay = document.getElementById('versionDisplay');
  const btnGroup = document.querySelector('.btn-group');
  const majorBtn = document.getElementById('majorBtn');
  const minorBtn = document.getElementById('minorBtn');
  const patchBtn = document.getElementById('patchBtn');
  const rollbackBtn = document.getElementById('rollbackBtn');

  function updateDisplay() {
    versionDisplay.textContent = vm.release();
  }

  createBtn.addEventListener('click', () => {
    try {
      vm = new VersionManager(versionInput.value.trim());
      updateDisplay();
      btnGroup.style.display = 'flex';
      versionInput.value = '';
      versionInput.focus();
    } catch (e) {
      alert(e.message);
    }
  });

  majorBtn.addEventListener('click', () => {
    try {
      vm.major();
      updateDisplay();
    } catch (e) {
      alert(e.message);
    }
  });

  minorBtn.addEventListener('click', () => {
    try {
      vm.minor();
      updateDisplay();
    } catch (e) {
      alert(e.message);
    }
  });

  patchBtn.addEventListener('click', () => {
    try {
      vm.patch();
      updateDisplay();
    } catch (e) {
      alert(e.message);
    }
  });

  rollbackBtn.addEventListener('click', () => {
    try {
      vm.rollback();
      updateDisplay();
    } catch (e) {
      alert(e.message);
    }
  });

  function VersionManager(initialVersion) {
  if (!initialVersion) { initialVersion = "0.0.1"; }
  const parts = initialVersion.split('.');
  if (parts.length !== 3 || parts.some(p => !/^\d+$/.test(p))) {
    throw new Error("Некорректный формат версии!");
  }
  this._major = parseInt(parts[0], 10);
  this._minor = parseInt(parts[1], 10);
  this._patch = parseInt(parts[2], 10);
  this._history = [];
}

VersionManager.prototype._saveState = function() {
  this._history.push([this._major, this._minor, this._patch]);
};

VersionManager.prototype.major = function() {
  this._saveState();
  this._major++;
  this._minor = 0;
  this._patch = 0;
  return this;
};

VersionManager.prototype.minor = function() {
  this._saveState();
  this._minor++;
  this._patch = 0;
  return this;
};

VersionManager.prototype.patch = function() {
  this._saveState();
  this._patch++;
  return this;
};

VersionManager.prototype.rollback = function() {
  if (this._history.length === 0) {
    throw new Error("Невозможно выполнить откат!");
  }
  const [major, minor, patch] = this._history.pop();
  this._major = major;
  this._minor = minor;
  this._patch = patch;
  return this;
};

VersionManager.prototype.release = function() {
  return `${this._major}.${this._minor}.${this._patch}`;
};



//-----------------------------------------------------
  
// Класс Rectangle
  class Rectangle {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
    area() {
      return this.width * this.height;
    }
    perimeter() {
      return 2 * (this.width + this.height);
    }
  }

  // Класс Square наследуется от Rectangle
  class Square extends Rectangle {
    constructor(side) {
      super(side, side);
    }
  }

  const widthInput = document.getElementById('widthInput');
  const heightInput = document.getElementById('heightInput');
  const areaBtn = document.getElementById('areaBtn');
  const perimeterBtn = document.getElementById('perimeterBtn');
  const resultDiv = document.getElementById('result');

  function createShape() {
    const w = parseFloat(widthInput.value);
    const h = parseFloat(heightInput.value);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      resultDiv.textContent = 'Пожалуйста, введите положительные числа для ширины и высоты.';
      return null;
    }

    if (w === h) {
      return new Square(w);
    } else {
      return new Rectangle(w, h);
    }
  }

  areaBtn.addEventListener('click', () => {
    const shape = createShape();
    if (!shape) {return;}
    const area = shape.area();
    resultDiv.textContent = `Площадь: ${area.toFixed(2)}`;
  });

  perimeterBtn.addEventListener('click', () => {
    const shape = createShape();
    if (!shape) {return;}
    const perimeter = shape.perimeter();
    resultDiv.textContent = `Периметр: ${perimeter.toFixed(2)}`;
  });

//---------------------------------------------------------------------------------------
  
const temp1Input = document.getElementById('temp1');
  const temp2Input = document.getElementById('temp2');
  const display1 = document.getElementById('display1');
  const display2 = document.getElementById('display2');
  const unitRadios = document.querySelectorAll('input[name="unit"]');
  const addBtn = document.getElementById('addBtn');
  const subBtn = document.getElementById('subBtn');
const resultDiv2 = document.getElementById('result2');
  
class Temperature {
  constructor(celsius) {
    this.celsius = celsius; // вызовет сеттер с валидацией
  }

  get celsius() {
    return this._celsius;
  }

  set celsius(value) {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('Температура должна быть числом');
    }
    if (value < -273.16 || value > 1.41e32) {
      throw new Error('Неверное значение температуры');
    }
    this._celsius = value;
  }

  toKelvin() {
    return +(this._celsius + 273.15).toFixed(2);
  }

  toFahrenheit() {
    return +((this._celsius * 9/5) + 32).toFixed(2);
  }

  toString() {
    return `${this.toKelvin()} K`;
  }

  static _checkInstance(obj) {
    if (!(obj instanceof Temperature)) {
      throw new Error('Аргумент не является экземпляром Temperature');
    }
  }

  static add(t1, t2) {
    Temperature._checkInstance(t1);
    Temperature._checkInstance(t2);
    return new Temperature(t1.celsius + t2.celsius);
  }

  static subtract(t1, t2) {
    Temperature._checkInstance(t1);
    Temperature._checkInstance(t2);
    return new Temperature(t1.celsius - t2.celsius);
  }
}

  // Создаёт экземпляр Temperature или null, если ввод некорректен
  function createTemperature(value) {
    const num = parseFloat(value);
    if (isNaN(num)) {return null;}
    try {
      return new Temperature(num);
    } catch {
      return null;
    }
  }

  // Отобразить температуру в выбранных единицах
  function formatTemperature(temp, unit) {
    if (!temp) {return '';}
    switch(unit) {
      case 'celsius': return `${temp.celsius.toFixed(2)} °C`;
      case 'kelvin': return `${temp.toKelvin().toFixed(2)} K`;
      case 'fahrenheit': return `${temp.toFahrenheit().toFixed(2)} °F`;
      default: return '';
    }
  }

  // Обновить отображение рядом с полями
  function updateDisplays() {
    const unit = getSelectedUnit();
    const t1 = createTemperature(temp1Input.value);
    const t2 = createTemperature(temp2Input.value);
    display1.textContent = t1 ? formatTemperature(t1, unit) : '';
    display2.textContent = t2 ? formatTemperature(t2, unit) : '';
    resultDiv2.textContent = '';
  }

  // Получить выбранную единицу
  function getSelectedUnit() {
    return [...unitRadios].find(r => r.checked).value;
  }

  // Обработчики событий
  temp1Input.addEventListener('input', updateDisplays);
  temp2Input.addEventListener('input', updateDisplays);
  unitRadios.forEach(radio => radio.addEventListener('change', updateDisplays));

  // Кнопки сложения и вычитания
  addBtn.addEventListener('click', () => {
    const t1 = createTemperature(temp1Input.value);
    const t2 = createTemperature(temp2Input.value);
    if (!t1 || !t2) {
      resultDiv2.textContent = 'Введите корректные температуры в градусах Цельсия.';
      return;
    }
    try {
      const sum = Temperature.add(t1, t2);
      resultDiv2.textContent = `Сумма: ${formatTemperature(sum, getSelectedUnit())}`;
    } catch (e) {
      resultDiv2.textContent = e.message;
    }
  });

  subBtn.addEventListener('click', () => {
    const t1 = createTemperature(temp1Input.value);
    const t2 = createTemperature(temp2Input.value);
    if (!t1 || !t2) {
      resultDiv2.textContent = 'Введите корректные температуры в градусах Цельсия.';
      return;
    }
    try {
      const diff = Temperature.subtract(t1, t2);
      resultDiv2.textContent = `Разность: ${formatTemperature(diff, getSelectedUnit())}`;
    } catch (e) {
      resultDiv2.textContent = e.message;
    }
  });

  // Инициализация отображения
updateDisplays();
  
//-----------------------------------------------------------------------------------------
// Паттерн наблюдатель
  class Subject {
    constructor() {
      this.observers = [];
    }
    subscribe(observer) {
      this.observers.push(observer);
    }
    unsubscribe(observer) {
      this.observers = this.observers.filter(obs => obs !== observer);
    }
    notify(data) {
      this.observers.forEach(obs => obs.update(data));
    }
  }

  // Класс для обработки и хранения статистики и истории
  class GameData extends Subject {
    constructor() {
      super();
      this.history = [];
      this.wins = { player1: 0, player2: 0 };
      this.choicesCount = {
        player1: { Камень: 0, Ножницы: 0, Бумага: 0 },
        player2: { Камень: 0, Ножницы: 0, Бумага: 0 }
      };
    }

    // Определяем победителя раунда
    static determineWinner(p1, p2) {
      if (p1 === p2) {return 0;} // ничья
      if (
        (p1 === "Камень" && p2 === "Ножницы") ||
        (p1 === "Ножницы" && p2 === "Бумага") ||
        (p1 === "Бумага" && p2 === "Камень")
      ) {return 1;}
      return 2;
    }

    addRound(round) {
      this.history.push(round);
      this.choicesCount.player1[round.player1]++;
      this.choicesCount.player2[round.player2]++;
      const winner = GameData.determineWinner(round.player1, round.player2);
      if (winner === 1) {this.wins.player1++;}
      else if (winner === 2) {this.wins.player2++;}
      this.notify(round);
    }
  }

  // Отдельные наблюдатели для минимального обновления UI

  class HistoryView {
    constructor(container) {
      this.container = container;
    }
    update(round) {
      const winner = GameData.determineWinner(round.player1, round.player2);
      let resultText = '';
      if (winner === 0) {resultText = 'Ничья';}
      else {resultText = `Победил Игрок ${winner}`;}
      const text = `Игрок 1: ${round.player1} — Игрок 2: ${round.player2} → ${resultText}`;
      const div = document.createElement('div');
      div.textContent = text;
      this.container.appendChild(div);
      // Автоскролл вниз
      this.container.scrollTop = this.container.scrollHeight;
    }
  }

  class WinsView {
    constructor(player1Elem, player2Elem, gameData) {
      this.player1Elem = player1Elem;
      this.player2Elem = player2Elem;
      this.gameData = gameData;
    }
    update() {
      this.player1Elem.textContent = `Игрок 1: ${this.gameData.wins.player1}`;
      this.player2Elem.textContent = `Игрок 2: ${this.gameData.wins.player2}`;
    }
  }

  class StatsView {
    constructor(listElem, playerKey, gameData) {
      this.listElem = listElem;
      this.playerKey = playerKey;
      this.gameData = gameData;
    }
    update() {
      const counts = this.gameData.choicesCount[this.playerKey];
      // Обновляем каждый li
      [...this.listElem.children].forEach(li => {
        const choice = li.textContent.split(':')[0];
        li.textContent = `${choice}: ${counts[choice] || 0}`;
      });
    }
  }

  // Основной код

  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const historyContainer = document.getElementById('history');
  const winsPlayer1Elem = document.getElementById('winsPlayer1');
  const winsPlayer2Elem = document.getElementById('winsPlayer2');
  const statsPlayer1Elem = document.getElementById('statsPlayer1');
  const statsPlayer2Elem = document.getElementById('statsPlayer2');

  const gameData = new GameData();

  const historyView = new HistoryView(historyContainer);
  const winsView = new WinsView(winsPlayer1Elem, winsPlayer2Elem, gameData);
  const statsView1 = new StatsView(statsPlayer1Elem, 'player1', gameData);
  const statsView2 = new StatsView(statsPlayer2Elem, 'player2', gameData);

  // Подписываемся на обновления
  gameData.subscribe({
    update: () => {
      // Обновляем минимально необходимые части
      winsView.update();
      statsView1.update();
      statsView2.update();
    }
  });
  gameData.subscribe(historyView);

  let eventSource = null;

  startBtn.addEventListener('click', () => {
    if (eventSource) {return;} // уже запущено
    eventSource = new EventSource('http://95.163.242.125:80/rps/stream');
    eventSource.addEventListener('round', e => {
      try {
        const data = JSON.parse(e.data);
        gameData.addRound(data);
      } catch (err) {
        alert('Ошибка парсинга данных:', err);
      }
    });
    eventSource.onerror = () => {
      alert('Ошибка соединения или закрытие');
      // Можно отключить или попытаться переподключить
    };
    startBtn.disabled = true;
    stopBtn.disabled = false;
  });

  stopBtn.addEventListener('click', () => {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
      startBtn.disabled = false;
      stopBtn.disabled = true;
    }
  });