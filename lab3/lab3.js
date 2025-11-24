// DOM элементы
const modal = document.getElementById('registrationModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const form = document.getElementById('registerForm');
const responseEl = document.getElementById('response');

const nameInp = document.getElementById('nameInp');
const emailInp = document.getElementById('emailInp');
const passwordInp = document.getElementById('passwordInp');

const nameErrorEl = document.getElementById('nameError');
const emailErrorEl = document.getElementById('emailError');
const passwordErrorEl = document.getElementById('passwordError');

// Открытие модального окна
openModalBtn.addEventListener('click', () => {
  modal.showModal();
});

// Закрытие модального окна (кнопка + клик по backdrop)
closeModalBtn.addEventListener('click', () => {
  modal.close();
});

modal.addEventListener('click', (event) => {
  const rect = modal.getBoundingClientRect();
  const isInDialog = (
    rect.top <= event.clientY &&
    event.clientY <= rect.top + rect.height &&
    rect.left <= event.clientX &&
    event.clientX <= rect.left + rect.width
  );
  if (!isInDialog) {
    modal.close();
  }
});

// Показ/скрытие пароля
function showPassword() {
  passwordInp.type = 'text';
  const btn = document.querySelector('.show-pass-btn');
  btn.setAttribute('aria-pressed', 'true');
}

function hidePassword() {
  passwordInp.type = 'password';
  const btn = document.querySelector('.show-pass-btn');
  btn.setAttribute('aria-pressed', 'false');
}

// Валидация поля при потере фокуса
function validateField(input, errorEl, customMessage = null) {
  const validity = input.validity;

  if (!input.hasAttribute('required')) {return;}

  if (validity.valid) {
    input.removeAttribute('aria-invalid');
    errorEl.setAttribute('hidden', '');
    errorEl.textContent = '';
    return;
  }

  input.setAttribute('aria-invalid', 'true');

  let message = '';

  if (validity.valueMissing) {
    message = 'Это поле обязательно для заполнения.';
  } else if (validity.typeMismatch && input.type === 'email') {
    message = 'Введите корректный адрес электронной почты.';
  } else if (validity.tooShort) {
    message = `Пароль должен содержать не менее ${input.minLength} символов.`;
  } else if (customMessage) {
    message = customMessage;
  } else {
    message = 'Некорректное значение.';
  }

  errorEl.textContent = message;
  errorEl.removeAttribute('hidden');
}

// Привязка валидации к blur
nameInp.addEventListener('blur', () => validateField(nameInp, nameErrorEl));
emailInp.addEventListener('blur', () => validateField(emailInp, emailErrorEl));
passwordInp.addEventListener('blur', () => validateField(passwordInp, passwordErrorEl));

// Валидация перед отправкой
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Сброс предыдущих ошибок
  [nameInp, emailInp, passwordInp].forEach(inp => {
    inp.removeAttribute('aria-invalid');
    const errId = inp.id.replace('Inp', 'Error');
    const errEl = document.getElementById(errId);
    errEl.setAttribute('hidden', '');
    errEl.textContent = '';
  });

  // Проверка всех полей
  let firstInvalid = null;
  const fields = [
    { input: nameInp, error: nameErrorEl },
    { input: emailInp, error: emailErrorEl },
    { input: passwordInp, error: passwordErrorEl }
  ];

  for (const { input, error } of fields) {
    if (!input.validity.valid) {
      validateField(input, error);
      if (!firstInvalid) {firstInvalid = input;}
    }
  }

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  // Форма валидна — сбор данных
  const formData = new FormData(form);
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  responseEl.textContent = JSON.stringify(data, null, 2);
  modal.close();
});