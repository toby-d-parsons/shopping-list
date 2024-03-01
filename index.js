const list = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");

list.style.listStyleType = "none";
list.style.paddingLeft = "0";

function onClick() {
    let myItem = input.value;
    input.value = ''; // Empties input text field
    const listItem = document.createElement('li');
    const listText = document.createElement('span');
    const listBtn = document.createElement('button');
    const listCheck = document.createElement('input');
    listCheck.setAttribute('type', 'checkbox');
    listItem.appendChild(listCheck);
    listItem.appendChild(listText);
    listItem.appendChild(listBtn);
    listText.textContent = myItem;
    listBtn.textContent = "Delete";
    if (myItem) {
        list.appendChild(listItem);
        input.style.outlineColor = "black";
    } else {
        input.style.outlineColor = "red";
    }
    listCheck.addEventListener("click", function() {
        if (listCheck.checked) {
            listText.style.textDecoration = 'line-through';
            listText.style.color = 'grey';
            listItem.removeChild(listBtn);
        } else {
            listText.style.textDecoration = 'none';
            listText.style.color = 'black';
            listItem.appendChild(listBtn);
        }
    });
    listBtn.addEventListener("click", () => list.removeChild(listItem));
    input.focus()
};

button.addEventListener("click", onClick);