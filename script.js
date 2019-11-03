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

console.log(input.value);

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
            "~","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace",
            "Tab","q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del",
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

                case "Caps":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
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
                    //keyElement.textContent = key.toLowerCase();
                    keyElement.textContent = key;

                    keyElement.addEventListener("click", () => {
                        input.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak && index !== 40) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});
