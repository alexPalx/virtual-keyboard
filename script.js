class Key {
    constructor(key, keyAlt = key, kCode, newClass = '') {
        this.key = key;
        this.keyAlt = keyAlt;
        this.kCode = kCode;
        this.newClass = newClass;
    }
}

class Keyboard {
    constructor(...keysets) {
        this.lang = 0;
        this.keys = [];
        keysets.forEach((set, i) => {
            this.keys.push([]);
            set.forEach(k => {
                this.keys[i].push(new Key(k[0], k[1], k[2], k[3]));
            });
        });
    }
}

const keysetEng = [
    ['`', '~', 192],
    ['1', '!', 49],
    ['2', '@', 50],
    ['3', '#', 51],
    ['4', '$', 52],
    ['5', '%', 53],
    ['6', '^', 54],
    ['7', '&', 55],
    ['8', '*', 56],
    ['9', '(', 57],
    ['0', ')', 48],
    ['-', '_', 189],
    ['=', '+', 187],
    ['Backspace', 'Backspace', 8, 'key-backspace'],
    ['Tab', 'Tab', 9, 'key-tab'],
    ['q', 'Q', 81],
    ['w', 'W', 87],
    ['e', 'E', 69],
    ['r', 'R', 82],
    ['t', 'T', 84],
    ['y', 'Y', 89],
    ['u', 'U', 85],
    ['i', 'I', 73],
    ['o', 'O', 79],
    ['p', 'P', 80],
    ['[', '{', 219],
    [']', '}', 221],
    ['\\', '|', 220],
    ['Del', 'Del', 46, 'key-del'],
    ['CapsLock', 'CapsLock', 20, 'key-caps'],
    ['a', 'A', 65],
    ['s', 'S', 83],
    ['d', 'D', 68],
    ['f', 'F', 70],
    ['g', 'G', 71],
    ['h', 'H', 72],
    ['j', 'J', 74],
    ['k', 'K', 75],
    ['l', 'L', 76],
    [';', ':', 186],
    ['\'', '"', 222],
    ['Enter', 'Enter', 13, 'key-enter'],
    ['Shift', 'Shift', 16, 'key-shift'],
    ['z', 'Z', 90],
    ['x', 'X', 88],
    ['c', 'C', 67],
    ['v', 'V', 86],
    ['b', 'B', 66],
    ['n', 'N', 78],
    ['m', 'M', 77],
    [',', '<', 188],
    ['.', '>', 190],
    ['/', '?', 191],
    ['▲', '▲', 38],
    ['Shift', 'Shift', 16, 'key-shift-right'],
    ['Ctrl', 'Ctrl', 17, 'key-ctrl'],
    ['Win', 'Win', 91, 'key-win'],
    ['Alt', 'Alt', 18, 'key-alt'],
    [' ', ' ', 32, 'key-space'],
    ['Alt', 'Alt', 18, 'key-alt-right'],
    ['◄', '◄', 37],
    ['▼', '▼', 40],
    ['►', '►', 39],
    ['Ctrl', 'Ctrl', 17, 'key-ctrl-right']
];

const keysetRu = [
    ['ё', 'Ё', 192],
    ['1', '!', 49],
    ['2', '"', 50],
    ['3', '№', 51],
    ['4', ';', 52],
    ['5', '%', 53],
    ['6', ':', 54],
    ['7', '?', 55],
    ['8', '*', 56],
    ['9', '(', 57],
    ['0', ')', 48],
    ['-', '_', 189],
    ['=', '+', 187],
    ['Backspace', 'Backspace', 8, 'key-backspace'],
    ['Tab', 'Tab', 9, 'key-tab'],
    ['й', 'Й', 81],
    ['ц', 'Ц', 87],
    ['у', 'У', 69],
    ['к', 'К', 82],
    ['е', 'Е', 84],
    ['н', 'Н', 89],
    ['г', 'Г', 85],
    ['ш', 'Ш', 73],
    ['щ', 'Щ', 79],
    ['з', 'З', 80],
    ['х', 'Х', 219],
    ['ъ', 'Ъ', 221],
    ['\\', '/', 220],
    ['Del', 'Del', 46, 'key-del'],
    ['CapsLock', 'CapsLock', 20, 'key-caps'],
    ['ф', 'Ф', 65],
    ['ы', 'Ы', 83],
    ['в', 'В', 68],
    ['а', 'А', 70],
    ['п', 'П', 71],
    ['р', 'Р', 72],
    ['о', 'О', 74],
    ['л', 'Л', 75],
    ['д', 'Д', 76],
    ['ж', 'Ж', 186],
    ['э', 'Э', 222],
    ['Enter', 'Enter', 13, 'key-enter'],
    ['Shift', 'Shift', 16, 'key-shift'],
    ['я', 'Я', 90],
    ['ч', 'Ч', 88],
    ['с', 'С', 67],
    ['м', 'М', 86],
    ['и', 'И', 66],
    ['т', 'Т', 78],
    ['ь', 'Ь', 77],
    ['б', 'Б', 188],
    ['ю', 'Ю', 190],
    ['.', ',', 191],
    ['▲', '▲', 38],
    ['Shift', 'Shift', 16, 'key-shift-right'],
    ['Ctrl', 'Ctrl', 17, 'key-ctrl'],
    ['Win', 'Win', 91, 'key-win'],
    ['Alt', 'Alt', 18, 'key-alt'],
    [' ', ' ', 32, 'key-space'],
    ['Alt', 'Alt', 18, 'key-alt-right'],
    ['◄', '◄', 37],
    ['▼', '▼', 40],
    ['►', '►', 39],
    ['Ctrl', 'Ctrl', 17, 'key-ctrl-right']
];

let keyboardObject;
let keyboard;
let textarea;
let shiftActive = false;
let capsActive = false;
let ctrlActive = false;
let altActive = false;
let shiftPressedWith = '';

const createTextarea = () => {
    const textareaElement = document.createElement('textarea');
    textareaElement.classList.add('textarea');
    textareaElement.setAttribute('readonly', '');
    document.body.append(textareaElement);
    textarea = document.querySelector('.textarea');
};

const updateKeys = () => {
    Array.from(keyboard.children).forEach((k, i) => {
        k.textContent = keyboardObject.keys[keyboardObject.lang][i][shiftActive ? 'keyAlt' : 'key'];
    });
};

const pressShift = (state) => {
    if (state) shiftActive = state;
    shiftActive = !shiftActive;
    updateKeys();
};

const mouseDown = (event) => {
    if (event.target.textContent === 'Shift') {
        pressShift();
        shiftPressedWith = 'mouse';
    }

    event.target.classList.add('active');
    event.target.classList.remove('remove');
};

const mouseUp = (event) => {
    if (shiftPressedWith === 'mouse') {
        pressShift();
        shiftPressedWith = '';
    }

    document.querySelectorAll('.keyboard__key.active').forEach(key => {
        if (key.textContent === 'CapsLock' && capsActive) return;
        if (key.textContent === 'Shift' && shiftPressedWith) return;
        key.classList.add('remove');
        key.classList.remove('active');
    });
};

const click = (event) => {
    if (event.target.tagName !== 'BUTTON') return;

    if (event.target.textContent === 'CapsLock') {
        if (!capsActive) {
            event.target.classList.add('active');
            event.target.classList.remove('remove');
        }
        else {
            event.target.classList.add('remove');
            event.target.classList.remove('active');
        }
        pressShift();
        capsActive = !capsActive;
    }
    if (event.target.textContent === 'Tab') {
        textarea.value += '\t';
    }
    if (event.target.textContent === 'Enter') {
        textarea.value += '\n';
    }

    keyboardObject.keys[keyboardObject.lang].forEach(k => {
        if (!k.newClass) {
            if (k.key === event.target.textContent) textarea.value += k.key;
            else if (k.keyAlt === event.target.textContent) textarea.value += k.keyAlt;
        }
    });
};

const keyDown = (event) => {
    if (event.key === 'Control' && altActive) {
        changeLang();
        ctrlActive = false;
    }
    else if (event.key === 'Alt' && ctrlActive) {
        changeLang();
        altActive = false;
    }
    if (event.key === 'Control') {
        ctrlActive = true;
    }
    if (event.key === 'Alt') {
        altActive = true;
    }
    if (event.key === 'Shift') {
        if (!shiftPressedWith) {
            pressShift();
            shiftPressedWith = 'keyboard';
        }
    }
    if (event.key === 'CapsLock') {
        pressShift();
        capsActive = !capsActive;
    }
    if (event.key === 'Tab') {
        textarea.value += '\t';
    }
    if (event.key === 'Enter') {
        textarea.value += '\n';
    }

    // else if (event.key === 'Backspace') { }
    // else if (event.key === 'Del') { }

    keyboardObject.keys[keyboardObject.lang].forEach((k, i) => {
        if (k.kCode === event.keyCode || event.key === 'Control' && k.key === 'Ctrl') {
            keyboard.children[i].classList.add('active');
            keyboard.children[i].classList.remove('remove');
        }
        if (!k.newClass) {
            if (k.kCode === event.keyCode && shiftActive) textarea.value += k.keyAlt;
            else if(k.kCode === event.keyCode) textarea.value += k.key;
        }
    });
};

const keyUp = (event) => {
    if (event.key === 'Control') {
        ctrlActive = false;
    }
    if (event.key === 'Alt') {
        altActive = false;
    }
    if (event.key === 'Shift') {
        pressShift();
        shiftPressedWith = '';
    }
    keyboardObject.keys[keyboardObject.lang].forEach((k, i) => {
        if (k.kCode === event.keyCode || event.key === 'Control' && k.key === 'Ctrl') {
            if (event.key === 'CapsLock' && capsActive) return;
            keyboard.children[i].classList.add('remove');
            keyboard.children[i].classList.remove('active');
        }
    });
};

// const keyPress = (event) => { };

const createKeyboard = () => {
    keyboardObject = new Keyboard(keysetEng, keysetRu);
    console.log(keyboardObject);

    const keyboardElement = document.createElement('div');
    keyboardElement.classList.add('keyboard');
    document.body.append(keyboardElement);
    keyboard = document.querySelector('.keyboard');

    for (let k = 0; k < keyboardObject.keys[keyboardObject.lang].length; ++k) {
        const keyElement = document.createElement('button');
        keyElement.textContent = keyboardObject.keys[keyboardObject.lang][k].key;
        keyElement.id = `key-${k}`;
        keyElement.classList.add('keyboard__key');
        if (keyboardObject.keys[keyboardObject.lang][k].newClass) {
            keyElement.classList.add(keyboardObject.keys[keyboardObject.lang][k].newClass);
        }

        keyboard.append(keyElement);
    }

    keyboard.addEventListener('mousedown', mouseDown);
    document.addEventListener('mouseup', mouseUp);
    keyboard.addEventListener('click', click);

    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    // document.addEventListener('keypress', keyPress);
};

const changeLang = () => {
    keyboardObject.lang = +!keyboardObject.lang;
    updateKeys();
};

const init = () => {
    createTextarea();
    createKeyboard();
};

window.addEventListener('load', init);
