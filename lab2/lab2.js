//like
const fillShape = document.querySelector('.fill-color-shape');
let isLiked = false;
function likeClick() {

  if (!isLiked) {
    fillShape.setAttribute('fill', '#e74c3c');
      isLiked = !isLiked;
      
  }
 else {
      isLiked = !isLiked;
      fillShape.setAttribute('fill', 'none');
  }
};

//like dislike
let isLiked2 = false
let isDisliked = false
const likeShape = document.querySelector('.like-color-shape');
const dislikeShape = document.querySelector('.dislike-color-shape');

function like2Click() {
    if (!isLiked2) {
        likeShape.setAttribute('fill', '#e74c3c');
        dislikeShape.setAttribute('fill', 'none');
        isLiked2 = !isLiked2;
        
      
  }
 else {
      isLiked2 = !isLiked2;
        likeShape.setAttribute('fill', 'none');
        
        isDisliked = false;
  }
}
function dislikeClick() {
    if (!isDisliked) {
        dislikeShape.setAttribute('fill', '#e74c3c');
        likeShape.setAttribute('fill', 'none');
        isDisliked = !isDisliked;
        
      
  }
 else {
      isDisliked = !isDisliked;
        dislikeShape.setAttribute('fill', 'none');
        
        isLiked2 = false;
  }
}

//корзина

 const cartCountElem = document.getElementById('cartCount');
  let cartCount = 0;

  document.querySelectorAll('.btn-add').forEach(button => {
    button.addEventListener('click', () => {
      cartCount++;
      cartCountElem.textContent = cartCount;
    });
  });

  document.querySelector('.cart-icon').addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      alert(`В корзине ${cartCount} товаров`);
    }
  });


//сортировка
  function randomNumber(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const originalArray = [];
    for (let i = 0; i < 10; i++) {
      originalArray.push(randomNumber(0, 100));
    }

    let currentArray = [...originalArray];

    const ul = document.getElementById('numberList');

    function renderList(arr) {
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
      arr.forEach(num => {
        const li = document.createElement('li');
        li.textContent = num;
        ul.appendChild(li);
      });
    }


    renderList(currentArray);

    document.getElementById('sortAsc').addEventListener('click', () => {
      currentArray.sort((a, b) => a - b);
      renderList(currentArray);
    });

    document.getElementById('sortDesc').addEventListener('click', () => {
      currentArray.sort((a, b) => b - a);
      renderList(currentArray);
    });

    document.getElementById('sortOriginal').addEventListener('click', () => {
      currentArray = [...originalArray];
      renderList(currentArray);
    });

//координаты

const output = document.getElementById('output');

  document.addEventListener('pointerdown', event => {
    
    const x = event.clientX;
    const y = event.clientY;

    const tagName = event.target.tagName.toLowerCase();

    output.textContent = `X: ${x}, Y: ${y} - элемент: ${tagName}`;
  });
