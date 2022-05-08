class Key {
    constructor(key, keyAlt = key, newClass = '') {
        this.key = key;
        this.keyAlt = keyAlt;
        this.newClass = newClass;
    }
}

class Keyboard {
    // [ [q, Q, newclass], [w, W], ... ]
    constructor(keyset) {
        this.keys = [];
        keyset.forEach(k => {
            this.keys.push(new Key(k[0], k[1], k[2]));
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
    ['Caps Lock', 'Caps Lock', 'key-caps'],
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
]

const createTextarea = () => {
    const textareaElement = document.createElement('textarea');
    textareaElement.classList.add('textarea');
    document.body.append(textareaElement);
};

const mouseDown = (event) => {
    event.target.classList.add('active');
    event.target.classList.remove('remove');
};

const mouseUp = (event) => {
    document.querySelectorAll('.keyboard__key.active').forEach(key => {
        key.classList.add('remove');
        key.classList.remove('active');
    });

};

const click = (event) => {
    if (event.target.tagName !== 'BUTTON') return;
    const textarea = document.querySelector('textarea');
    textarea.value += event.target.textContent;
};

const keyDown = (event) => {
    
};

const keyUp = (event) => {

};

const keyPress = (event) => {

};

const createKeyboard = () => {
    const keyboardObject = new Keyboard(keysetEng);
    console.log(keyboardObject);

    const keyboardElement = document.createElement('div');
    keyboardElement.classList.add('keyboard');
    document.body.append(keyboardElement);
    const keyboard = document.querySelector('.keyboard');

    for (let k = 0; k < keyboardObject.keys.length; ++k) {
        const keyElement = document.createElement('button');
        keyElement.textContent = keyboardObject.keys[k].key;
        keyElement.id = `key-${k}`;
        keyElement.classList.add('keyboard__key');
        if (keyboardObject.keys[k].newClass) {
            keyElement.classList.add(keyboardObject.keys[k].newClass);
        }

        keyboard.append(keyElement);
    }

    keyboard.addEventListener('mousedown', mouseDown);
    document.addEventListener('mouseup', mouseUp);
    keyboard.addEventListener('click', click);

    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    document.addEventListener('keypress', keyPress);
};

const init = () => {
    createTextarea();
    createKeyboard();
};

window.addEventListener('load', init);
