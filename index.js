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

let idCounter = 1000;

function onClick() {
    let myItem = input.value;
    input.value = ''; // Empties input text field
    const listItem = document.createElement('li');
    const listText = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const tagInput = document.createElement('input');
    const listCheck = document.createElement('input');
    listItem.id = idCounter;
    listItem.classList.add('list-item');
    idCounter++;
    listText.className = 'item-text item-incomplete';
    tagInput.className = 'tag-input';
    deleteBtn.className = 'deleteBtn';
    listItem.style.cssText = ('display: flex'); // Unable to move into CSS without tags moving to next line. Despite the correct class, does not add flex
    tagInput.setAttribute("placeholder", "Add new tag...");
    listText.setAttribute("contentEditable", "true");
    listCheck.setAttribute('type', 'checkbox');
    listItem.appendChild(listCheck);
    listItem.appendChild(listText);
    listItem.appendChild(tagInput);
    listItem.appendChild(deleteBtn);
    itemArray.push(listItem);
    listText.textContent = myItem;
    deleteBtn.textContent = "Delete";
    if (myItem) {
        list.appendChild(listItem);
        input.style.outlineColor = "black";
    } else {
        input.style.outlineColor = "red";
    }
    listCheck.addEventListener("click", function() {
        if (listCheck.checked) {
            listText.classList.remove('item-incomplete');
            listText.classList.add('item-complete');
            listItem.removeChild(deleteBtn);
        } else {
            listText.classList.add('item-incomplete');
            listText.classList.remove('item-complete');
            listItem.appendChild(deleteBtn);
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
            myTag.classList.add('tag-item');
            tagBtn.addEventListener("click", () => listItem.removeChild(myTag));
        } else if (event.key === 'Enter' && tagInput.value == '') {
            tagInput.style.outlineColor = "red";
        }
    })
    deleteBtn.addEventListener("click", () => list.removeChild(listItem));
    listText.addEventListener("mouseover", () => listText.style.color = "grey");
    listText.addEventListener("mouseout", () => listText.style.color = "black");
    input.focus()
};

function sortAsc() {
    let listItemsToShuffle = list.querySelectorAll("li");
    for (let i = 0; i < listItemsToShuffle.length - 1; i++) {
        for (let ie = i +1; ie < listItemsToShuffle.length; ) {
            if ((listItemsToShuffle[i].querySelector('.item-text').innerHTML.toLowerCase().trimStart().localeCompare(listItemsToShuffle[ie].querySelector('.item-text').innerHTML.toLowerCase().trimStart()) === 1)) {
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
            if ((listItemsToShuffle[i].querySelector('.item-text').innerHTML.toLowerCase().trimStart().localeCompare(listItemsToShuffle[ie].querySelector('.item-text').innerHTML.toLowerCase().trimStart()) === -1)) {
                list.appendChild(listItemsToShuffle[i]);
                listItemsToShuffle = list.querySelectorAll("li");
                ie = i +1;
            } else {
                ie++;
            }
        }
    }
}

// sortBtnAsc.classList.add('TESTCLASS');
// document.getElementsByClassName('TESTCLASS').style.cssText('background-color') = 'pink';

// const TEST = document.querySelector('.TESTCLASS');

/* function toggleSortBtn(X) {
    // outside function, create function class
    // needs a css file to work really
} */


button.addEventListener("click", onClick);
sortBtnAsc.addEventListener("click", sortAsc);
sortBtnDesc.addEventListener("click", sortDesc);