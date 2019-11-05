// draw text area
let TextInput = document.createElement('div');
TextInput.className = "text-input";
let input = document.createElement("textarea");
input.name = "post";
input.maxLength = "5000";
input.cols = "100";
input.rows = "15";
input.style.fontSize = "25px";
TextInput.appendChild(input);
//dom output
document.body.append(TextInput);

// draw keyboard
const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    properties: {
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard-area");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "~`","!1", "@2", "#3", "$4", "%5", ":6", "?7", "*8", "(9", ")0", "_-", "+=", "Backspace",
            "Tab","q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "/\\", "Del",
            "Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
            "Shift", "\\", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "↑", "Shift",
            "Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl", "←", "↓", "→"
        ];

        keyLayout.forEach((key, index) => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["Backspace", "Del", "Enter", "Shift"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "Del":
                case "Win":
                case "Alt":
                    keyElement.textContent = key;
                    break;

                case "Tab":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        input.value += "    ";
                    });

                    break;

                case "Backspace":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        input.value = input.value.substring(0, input.value.length - 1);
                    });

                    break;

                case "Shift":
                case "Caps":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                    });

                    break;

                case "Enter":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        input.value += "\n";
                    });

                    break;

                case "Space":
                    keyElement.classList.add("wide");
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        input.value += " ";
                    });

                    break;

                default:
                    if ((index >=0 && index<14) || index === 27){
                        keyElement.innerHTML = "<sup>"+key[0]+"</sup>"+" "+key[1];
                        keyElement.addEventListener("click", () => {
                            input.value += this.properties.capsLock ? key[0] : key[1];
                        });
                    }else {
                        keyElement.textContent = key;
                        keyElement.addEventListener("click", () => {
                            input.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        });
                    }

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak && index !== 42) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        for (const key of this.elements.keys) {
            const FixedText = ["Backspace", "Tab", "Del", "Caps", "Enter", "Shift", "Ctrl", "Win", "Alt", "Space"].indexOf(key.textContent) === -1;
            if (key.childElementCount === 0 && FixedText) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    keyPress (index) {
        this.elements.keys[index].classList.add('physical-key-press');
    },

    keyRelease (index) {
        this.elements.keys[index].classList.remove('physical-key-press');
    }

};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

const keyCode = [
    "Backquote","Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace",
    "Tab","KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete",
    "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter",
    "ShiftLeft", "Backslash", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight",
    "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"
];

const KeyboardChildren = Keyboard._createKeys().childNodes;
const generatedKeys = [];
//delete "br" nodes
for (const key of KeyboardChildren) {
    if (key.localName !== 'br') {
        generatedKeys.push(key);
    }
}

document.addEventListener('keydown', (e) => {
    const IndexOfPressedKey = keyCode.indexOf(e.code);
    Keyboard.keyPress(IndexOfPressedKey);
});

document.addEventListener('keyup', (e) => {
    const IndexOfPressedKey = keyCode.indexOf(e.code);
    Keyboard.keyRelease(IndexOfPressedKey);
});
