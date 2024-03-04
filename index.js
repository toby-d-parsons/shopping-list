const divAppend = document.querySelector("div");
const list = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");
let itemArray = [];
console.log(itemArray);
const sortBtnAsc = document.createElement("button");
sortBtnAsc.textContent = "Sort (A-Z)";
divAppend.appendChild(sortBtnAsc);
const sortBtnDesc = document.createElement("button");
sortBtnDesc.textContent = "Sort (Z-A)";
divAppend.appendChild(sortBtnDesc);

list.style.listStyleType = "none";
list.style.paddingLeft = "0";
let idCounter = 1000;

function onClick() {
    let myItem = input.value;
    input.value = ''; // Empties input text field
    const listItem = document.createElement('li');
    const listText = document.createElement('button');
    const listBtn = document.createElement('button');
    const tagInput = document.createElement('input');
    const listCheck = document.createElement('input');
    listItem.id = idCounter;
    idCounter++;
    listText.className = 'itemText';
    listItem.style.cssText = ('display: flex');
    listText.style.cssText = 'color: inherit; border: 1px solid black; border-radius: 5px; padding: 5px; outline: inherit;'
    tagInput.style.cssText = 'width: 90px; border: 1px solid black; border-radius: 2px; margin: 0px 20px';
    tagInput.setAttribute("placeholder", "Add new tag...");
    listText.setAttribute("contentEditable", "true");
    listCheck.setAttribute('type', 'checkbox');
    listItem.appendChild(listCheck);
    listItem.appendChild(listText);
    listItem.appendChild(tagInput);
    listItem.appendChild(listBtn);
    itemArray.push(listItem);
    listText.textContent = myItem;
    listBtn.style.cssText = ('order: 9999');
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
        if (event.key === 'Enter' && tagInput.value) {
            tagInput.style.outlineColor = "black";
            const tagValue = tagInput.value;
            tagInput.value = '';
            const myTag = document.createElement('div');
            const tagText = document.createElement('span');
            const tagBtn = document.createElement('button');
            tagText.textContent = tagValue;
            tagBtn.textContent = 'X';
            tagText.style.cssText = ('margin: 0px 5px');
            tagBtn.style.cssText = ('margin: 0px 5px');
            myTag.appendChild(tagText);
            myTag.appendChild(tagBtn);
            listItem.appendChild(myTag);
            myTag.style.cssText = ("margin: 0px 2px; background-color: #8bace0; border: 1px solid black; border-radius: 2px; order: 4");
            tagBtn.addEventListener("click", () => listItem.removeChild(myTag));
        } else if (event.key === 'Enter' && tagInput.value == '') {
            tagInput.style.outlineColor = "red";
        }
    })
    listBtn.addEventListener("click", () => list.removeChild(listItem));
    listText.addEventListener("mouseover", () => listText.style.color = "grey");
    listText.addEventListener("mouseout", () => listText.style.color = "black");
    input.focus()
};

function sortAsc() {
    let listItemsToShuffle = list.querySelectorAll("li");
    for (let i = 0; i < listItemsToShuffle.length - 1; i++) {
        for (let ie = i +1; ie < listItemsToShuffle.length; ) {
            if ((listItemsToShuffle[i].querySelector('.itemText').innerHTML.toLowerCase().trimStart().localeCompare(listItemsToShuffle[ie].querySelector('.itemText').innerHTML.toLowerCase().trimStart()) === 1)) {
                list.appendChild(listItemsToShuffle[i]);
                listItemsToShuffle = list.querySelectorAll("li");
                ie = i +1;
            } else {
                ie++;
            }
        }
    }
}

function sortDesc() {
    let listItemsToShuffle = list.querySelectorAll("li");
    for (let i = 0; i <listItemsToShuffle.length - 1; i++) {
        for (let ie = i +1; ie < listItemsToShuffle.length; ) {
            if ((listItemsToShuffle[i].querySelector('.itemText').innerHTML.toLowerCase().trimStart().localeCompare(listItemsToShuffle[ie].querySelector('.itemText').innerHTML.toLowerCase().trimStart()) === -1)) {
                list.appendChild(listItemsToShuffle[i]);
                listItemsToShuffle = list.querySelectorAll("li");
                ie = i +1;
            } else {
                ie++;
            }
        }
    }
}

button.addEventListener("click", onClick);
sortBtnAsc.addEventListener("click", sortAsc);
sortBtnDesc.addEventListener("click", sortDesc);