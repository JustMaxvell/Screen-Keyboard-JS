// Определяем все кнопки и текстовую область
const keyboard = document.querySelector('.keyboard'); 
const keys = document.querySelectorAll(".key");
const textarea = document.querySelector("textarea");

// Определяем все кнопки управления и загружаем их в массив

// Подстветка клавиш

window.onkeydown = (e) => {
  textarea.focus();
  keys.forEach((key) => {
    if (key.className.includes(e.code)) {
      key.classList.add("pushed");
    }
  });
};

window.onkeyup = (e) => {
  keys.forEach((key) => {
    if (key.className.includes(e.code)) {
      key.classList.remove("pushed");
    }
  });
};

// Ввод с виртуальной клавиатуры

keys.forEach((key) => {
  key.onclick = (e) => {
    if (
      (key.className.includes("number") || key.className.includes("sml")) &&
      activeShift
    ) {
      textarea.value += key.textContent;
    } else if (
      (key.className.includes("number") || key.className.includes("sml")) &&
      !activeShift
    ) {
      textarea.value += key.textContent.toLowerCase();
    } else if (key.className.includes("Shift")) {
      changeRegister (key);
    } else if (key.className.includes("Backspace")) {
      textarea.value =  textarea.value.substring(0, textarea.value.length - 1);
    } else if (key.className.includes("Space")) {
      textarea.value += ' ';
    }
  };
});

// Реализация регистра

let activeShift = false;

function changeRegister (key) {
  key.classList.toggle('active');
  activeShift = !activeShift;
}

// Перемещение клавиатуры по экрану

const moveButton = document.querySelector('.Move');
moveButton.onmousedown = (e) => {
  moveAt(e);

  keyboard.style.zIndex = 1000; 

  function moveAt(e) {
    keyboard.style.left = e.pageX - 960 + 'px';
    keyboard.style.top = e.pageY - 50 + 'px';
  }

  //перемещать по экрану
  document.onmousemove = function(e) {
    moveAt(e);
  }

  //отследить окончание переноса
  keyboard.onmouseup = function() {
    document.onmousemove = null;
    keyboard.onmouseup = null;
  }
}

// Смена языка 

const changeLangButton = document.querySelector('.Leng');
changeLangButton.dataset.leng = 'ENG';

const keyboards = {
  RUS : ['Й','Ц','У','К','Е','Н','Г','Ш','Щ','З','Х','Ъ','Ф','Ы','В','А','П','Р','О','Л','Д','Ж','Э','/','Я','Ч','C','М','И','Т','Ь','Б','Ю','.','?'],
  ENG : ['Q','W','E','R','T','Y','U','I','O','P','[',']','A','S','D','F','G','H','J','K','L',';','"','/','<','Z','X','C','V','B','N','M',',','.','?']
}

changeLangButton.onclick = () => {

  if (changeLangButton.dataset.leng === 'ENG') {
    changeLaguage ('RUS');
  } else if (changeLangButton.dataset.leng === 'RUS') {
    changeLaguage ('ENG');
  }
}

function changeLaguage (leng) {
  let pos = 0;
  keys.forEach (key => {
    if (key.className.includes('sml')) {
      key.textContent = keyboards[leng][pos];
      pos++;
    } 
  })
  changeLangButton.dataset.leng = leng;
}

