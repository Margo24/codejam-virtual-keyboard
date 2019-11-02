// text area
let div = document.createElement('div');
div.className = "text-input";
let input = document.createElement("textarea");
input.name = "post";
input.maxLength = "5000";
input.cols = "200";
input.rows = "20";
input.style.fontSize = "20px";
div.appendChild(input);
//div.innerHTML = "<strong>Всем привет!</strong> Вы прочитали важное сообщение.";
document.body.append(div);