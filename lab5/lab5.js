const toastContainer = document.getElementById('toast-container');

  /**
   * Показывает тост с сообщением и типом ('success' или 'error')
   * @param {string} message - текст сообщения
   * @param {string} type - 'success' или 'error'
   */
  function showToast(message, type = 'success') {
    // Создаём элемент тоста
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('tabindex', '0'); // чтобы можно было сфокусироваться

    // Текст сообщения
    toast.textContent = message;

    // Кнопка закрытия
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.setAttribute('aria-label', 'Закрыть уведомление');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => hideToast(toast);

    toast.appendChild(closeBtn);
    toastContainer.appendChild(toast);

    // Плавное появление
    // Используем setTimeout, чтобы сработал transition
    setTimeout(() => {
      toast.classList.add('show');
      toast.focus();
    }, 10);

    // Автоматическое скрытие через 5 секунд
    const autoHideTimeout = setTimeout(() => {
      hideToast(toast);
    }, 5000);

    // При закрытии вручную очищаем таймер
    toast.closeBtnTimeout = autoHideTimeout;
  }

  /**
   * Скрывает и удаляет тост
   * @param {HTMLElement} toast 
   */
  function hideToast(toast) {
    clearTimeout(toast.closeBtnTimeout);
    toast.classList.remove('show');
    // Ждём окончания анимации, затем удаляем
    toast.addEventListener('transitionend', () => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, { once: true });
}
  

//---------------------------------------------------------------------------------------


const API_URL = 'http://95.163.242.125/images'; // правильный URL
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000; // мс

  const refreshBtn = document.getElementById('refreshBtn');
  const loader = document.getElementById('loader');
  const gallery = document.getElementById('gallery');
  const emptyMessage = document.getElementById('emptyMessage');
  const toastContainer2 = document.getElementById('toast-container2');

  // Toast функции
  function showToast2(message, type = 'error') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('tabindex', '0');
    toast.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.setAttribute('aria-label', 'Закрыть уведомление');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => hideToast(toast);

    toast.appendChild(closeBtn);
    toastContainer2.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
      toast.focus();
    }, 10);

    const autoHideTimeout = setTimeout(() => {
      hideToast(toast);
    }, 5000);

    toast.closeBtnTimeout = autoHideTimeout;
  }

  function hideToast(toast) {
    clearTimeout(toast.closeBtnTimeout);
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, { once: true });
  }




async function fetchWithRetry(url, retries = 3, delay = 1000) {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error(`Ожидался JSON, но получен: ${contentType}`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Ответ не является массивом изображений');
      }
      return data;
    } catch (err) {
      if (i === retries) throw err;
      await new Promise(res => setTimeout(res, delay));
    }
  }
}



  // Отрисовка галереи
  function renderGallery(images) {
    gallery.innerHTML = '';
    if (!images.length) {
      emptyMessage.style.display = 'block';
      return;
    }
    emptyMessage.style.display = 'none';

    images.forEach(img => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.setAttribute('role', 'listitem');

      const image = document.createElement('img');
      image.src = img.url;
      image.alt = img.alt || img.description || 'Изображение';
      image.loading = 'lazy';

      const caption = document.createElement('div');
      caption.className = 'caption';
      caption.textContent = img.description || img.alt || 'Без названия';

      item.appendChild(image);
      item.appendChild(caption);
      gallery.appendChild(item);
    });
  }

  // Загрузка галереи с обработкой ошибок и загрузчиком
  async function loadGallery() {
    loader.style.display = 'block';
    gallery.style.display = 'none';
    emptyMessage.style.display = 'none';

    try {
      const images = await fetchWithRetry(API_URL);
      loader.style.display = 'none';
      gallery.style.display = 'grid';

      if (!Array.isArray(images) || images.length === 0) {
        emptyMessage.style.display = 'block';
        gallery.style.display = 'none';
      } else {
        renderGallery(images);
      }
    } catch (error) {
      loader.style.display = 'none';
      gallery.style.display = 'none';
      emptyMessage.style.display = 'none';
      showToast2('Не удалось загрузить изображения после нескольких попыток.', 'error');
    }
  }

  refreshBtn.addEventListener('click', loadGallery);
window.addEventListener('DOMContentLoaded', loadGallery);
  
//---------------------------------------------------------------------------------------

const form = document.getElementById('tempForm');
  const submitBtn = document.getElementById('submitBtn');
  const toastContainer3 = document.getElementById('toast-container3');

  function showToast3(message, type = 'error') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');
    toast.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.setAttribute('aria-label', 'Закрыть уведомление');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => hideToast(toast);

    toast.appendChild(closeBtn);
    toastContainer3.appendChild(toast);

    // Показ с анимацией
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    // Автоматическое скрытие через 5 секунд
    toast.timeoutId = setTimeout(() => {
      hideToast(toast);
    }, 5000);
  }

  function hideToast(toast) {
    clearTimeout(toast.timeoutId);
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, { once: true });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Блокируем кнопку
    submitBtn.disabled = true;

    // Считываем значения
    const classValue = form.class.value.trim();
    const tempValue = parseFloat(form.temp.value);

    // Формируем тело запроса
    const body = {
      class: classValue,
      temp: tempValue
    };

    try {
      const response = await fetch('http://95.163.242.125/temp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok && data.status === 'ok') {
        showToast3(data.message || 'Данные успешно отправлены', 'success');
        form.reset();
        form.class.focus();
      } else {
        showToast3(data.message || 'Ошибка при отправке данных', 'error');
      }
    } catch (error) {
      showToast3('Ошибка сети или сервера', 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });

// ----------------------------------------------------
  

  
  const btn = document.getElementById('themeToggle');

  function updateButtonText(isDark) {
    btn.textContent = isDark ? '☀️ Светлая тема' : '🌙 Тёмная тема';
  }

  // Инициализация кнопки по текущей теме
  const isDark = document.documentElement.classList.contains('dark');
  updateButtonText(isDark);

  btn.addEventListener('click', () => {
    const isDarkNow = document.documentElement.classList.toggle('dark');
    document.body.classList.toggle('dark', isDarkNow);

    try {
      localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
    } catch(e) {
      // Игнорируем ошибки localStorage
    }

    updateButtonText(isDarkNow);
  });