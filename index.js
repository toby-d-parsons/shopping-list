const list = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");

list.style.listStyleType = "none";
list.style.paddingLeft = "0";

function onClick() {
    let myItem = input.value;
    input.value = ''; // Empties input text field
    const listItem = document.createElement('li');
    const listText = document.createElement('button');
    const listBtn = document.createElement('button');
    const tagInput = document.createElement('input');
    const listCheck = document.createElement('input');
    listText.style.cssText = 'color: inherit; border: 1px solid black; border-radius: 5px; padding: 5px; outline: inherit;'
    tagInput.style.cssText = 'border: 1px solid black; border-radius: 2px; margin: 0px 20px';
    tagInput.setAttribute("placeholder", "Add new tag...");
    listText.setAttribute("contentEditable", "true");
    listCheck.setAttribute('type', 'checkbox');
    listItem.appendChild(listCheck);
    listItem.appendChild(listText);
    listItem.appendChild(tagInput);
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
    tagInput.addEventListener("keydown", (event) => {
        if (event.key === 'Enter') {
            // alert("TEST");
            const tagValue = tagInput.value;
            tagInput.value = '';
            const myTag = document.createElement('div');
            const tagText = document.createElement('span');
            const tagBtn = document.createElement('button');
            tagText.textContent = tagValue;
            tagBtn.textContent = 'X';
            myTag.appendChild(tagText);
            myTag.appendChild(tagBtn);
            listItem.appendChild(myTag);
            myTag.style.cssText = ("display: inline");
            tagBtn.addEventListener("click", () => listItem.removeChild(myTag));
        }
    })
    listBtn.addEventListener("click", () => list.removeChild(listItem));
    listText.addEventListener("mouseover", () => listText.style.color = "grey");
    listText.addEventListener("mouseout", () => listText.style.color = "black");
    input.focus()
};

button.addEventListener("click", onClick);