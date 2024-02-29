const list = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");

function onClick() {
    let myItem = input.value;
    input.value = ''; // Empties input text field
    const listItem = document.createElement('li');
    const listText = document.createElement('span');
    const listBtn = document.createElement('button');
    listItem.appendChild(listText);
    listItem.appendChild(listBtn);
    listText.textContent = myItem;
    listBtn.textContent = "Delete";
    list.appendChild(listItem);
    listBtn.addEventListener("click", () => list.removeChild(listItem));
    input.focus()
};

button.addEventListener("click", onClick);