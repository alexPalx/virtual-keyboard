class Key {
    constructor(key, keyAlt = key, newClass = '') {
        this.key = key;
        this.keyAlt = keyAlt;
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
                this.keys[i].push(new Key(k[0], k[1], k[2]));
            });
        });
    }
}

const keysetEng = [
    ['`', '~'],
    ['1', '!'],
    ['2', '@'],
    ['3', '#'],
    ['4', '$'],
    ['5', '%'],
    ['6', '^'],
    ['7', '&'],
    ['8', '*'],
    ['9', '('],
    ['0', ')'],
    ['-', '_'],
    ['=', '+'],
    ['Backspace', 'Backspace', 'key-backspace'],
    ['Tab', 'Tab', 'key-tab'],
    ['q', 'Q'],
    ['w', 'W'],
    ['e', 'E'],
    ['r', 'R'],
    ['t', 'T'],
    ['y', 'Y'],
    ['u', 'U'],
    ['i', 'I'],
    ['o', 'O'],
    ['p', 'P'],
    ['[', '{'],
    [']', '}'],
    ['\\', '|'],
    ['Del', 'Del', 'key-del'],
    ['CapsLock', 'CapsLock', 'key-caps'],
    ['a', 'A'],
    ['s', 'S'],
    ['d', 'D'],
    ['f', 'F'],
    ['g', 'G'],
    ['h', 'H'],
    ['j', 'J'],
    ['k', 'K'],
    ['l', 'L'],
    [';', ':'],
    ['\'', '"'],
    ['Enter', 'Enter', 'key-enter'],
    ['Shift', 'Shift', 'key-shift'],
    ['z', 'Z'],
    ['x', 'X'],
    ['c', 'C'],
    ['v', 'V'],
    ['b', 'B'],
    ['n', 'N'],
    ['m', 'M'],
    [',', '<'],
    ['.', '>'],
    ['/', '?'],
    ['▲', '▲'],
    ['Shift', 'Shift', 'key-shift-right'],
    ['Ctrl', 'Ctrl', 'key-ctrl'],
    ['Win', 'Win', 'key-win'],
    ['Alt', 'Alt', 'key-alt'],
    [' ', ' ', 'key-space'],
    ['Alt', 'Alt', 'key-alt-right'],
    ['◄', '◄'],
    ['▼', '▼'],
    ['►', '►'],
    ['Ctrl', 'Ctrl', 'key-ctrl-right']
];

const keysetRu = [
    ['ё', 'Ё'],
    ['1', '!'],
    ['2', '"'],
    ['3', '№'],
    ['4', ';'],
    ['5', '%'],
    ['6', ':'],
    ['7', '?'],
    ['8', '*'],
    ['9', '('],
    ['0', ')'],
    ['-', '_'],
    ['=', '+'],
    ['Backspace', 'Backspace', 'key-backspace'],
    ['Tab', 'Tab', 'key-tab'],
    ['й', 'Й'],
    ['ц', 'Ц'],
    ['у', 'У'],
    ['к', 'К'],
    ['е', 'Е'],
    ['н', 'Н'],
    ['г', 'Г'],
    ['ш', 'Ш'],
    ['щ', 'Щ'],
    ['з', 'З'],
    ['х', 'Х'],
    ['ъ', 'Ъ'],
    ['\\', '/'],
    ['Del', 'Del', 'key-del'],
    ['CapsLock', 'CapsLock', 'key-caps'],
    ['ф', 'Ф'],
    ['ы', 'Ы'],
    ['в', 'В'],
    ['а', 'А'],
    ['п', 'П'],
    ['р', 'Р'],
    ['о', 'О'],
    ['л', 'Л'],
    ['д', 'Д'],
    ['ж', 'Ж'],
    ['э', 'Э'],
    ['Enter', 'Enter', 'key-enter'],
    ['Shift', 'Shift', 'key-shift'],
    ['я', 'Я'],
    ['ч', 'Ч'],
    ['с', 'С'],
    ['м', 'М'],
    ['и', 'И'],
    ['т', 'Т'],
    ['ь', 'Ь'],
    ['б', 'Б'],
    ['ю', 'Ю'],
    ['.', ','],
    ['▲', '▲'],
    ['Shift', 'Shift', 'key-shift-right'],
    ['Ctrl', 'Ctrl', 'key-ctrl'],
    ['Win', 'Win', 'key-win'],
    ['Alt', 'Alt', 'key-alt'],
    [' ', ' ', 'key-space'],
    ['Alt', 'Alt', 'key-alt-right'],
    ['◄', '◄'],
    ['▼', '▼'],
    ['►', '►'],
    ['Ctrl', 'Ctrl', 'key-ctrl-right']
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
        pressShift();
        shiftPressedWith = 'keyboard';
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
    // else if (event.key === 'Ctrl') { }
    // else if (event.key === 'Meta') { }
    // else if (event.key === 'Alt') { }

    keyboardObject.keys[keyboardObject.lang].forEach((k, i) => {
        if (k.key === event.key || k.keyAlt === event.key || event.key === 'Control' && k.key === 'Ctrl') {
            keyboard.children[i].classList.add('active');
            keyboard.children[i].classList.remove('remove');
        }
        if (!k.newClass) {
            if (k.key === event.key) textarea.value += k.key;
            else if (k.keyAlt === event.key) textarea.value += k.keyAlt;
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
        if (k.key === event.key || k.keyAlt === event.key  || event.key === 'Control' && k.key === 'Ctrl') {
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
