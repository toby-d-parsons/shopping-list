const divAppend = document.querySelector("div");
const list = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");
let itemArray = [];
let completedArray = [];
console.log(itemArray);
const sortBtnAsc = document.createElement("button");
sortBtnAsc.textContent = "Sort (A-Z)";
divAppend.appendChild(sortBtnAsc);
const sortBtnDesc = document.createElement("button");
sortBtnDesc.textContent = "Sort (Z-A)";
divAppend.appendChild(sortBtnDesc);
const checkboxContainer = document.createElement("span");
divAppend.appendChild(checkboxContainer);
const checkboxText = document.createElement("label");
checkboxContainer.appendChild(checkboxText);
checkboxText.textContent = "Hide completed";
const completedBtn = document.createElement("input");
completedBtn.setAttribute('type', 'checkbox');
checkboxContainer.appendChild(completedBtn);

let idCounter = 1000;

function onClick() {
    let myItem = input.value.trim();
    input.value = ''; // Empties input text field
    const listItem = document.createElement('li');
    const listText = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const tagInput = document.createElement('input');
    const listCheck = document.createElement('input');
    listItem.id = idCounter;
    listItem.classList.add('list-item', 'item-incomplete');
    idCounter++;
    listText.className = 'item-text';
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
            listItem.classList.remove('item-incomplete');
            listItem.classList.add('item-complete');
            listItem.removeChild(deleteBtn);
        } else {
            listItem.classList.add('item-incomplete');
            listItem.classList.remove('item-complete');
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
    if (completedBtn.checked) {
        for (let p = 0; p < listItemsToShuffle.length; p++) {
            if (listItemsToShuffle[p].classList.contains('item-complete')) {
                completedArray.push(listItemsToShuffle[p]);
                list.removeChild(listItemsToShuffle[p]);
            }
        }
    } else {
        for (let p = 0; p < completedArray.length; ) {
            list.appendChild(completedArray[p]);
            completedArray.splice(0, 1);
        }
    } // could make this into two functions from here
    listItemsToShuffle = list.querySelectorAll("li");
    sortBtnAsc.classList.add('sort-toggled');
    sortBtnDesc.classList.remove('sort-toggled');
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
    sortBtnDesc.classList.add('sort-toggled');
    sortBtnAsc.classList.remove('sort-toggled');
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

function sortById() {
    sortBtnAsc.classList.remove('sort-toggled');
    sortBtnDesc.classList.remove('sort-toggled');
    let listItemsToShuffle = list.querySelectorAll("li");
    for (let i = 0; i <listItemsToShuffle.length - 1; i++) {
        for (let ie = i +1; ie < listItemsToShuffle.length; ) {
            if ((listItemsToShuffle[i].id.localeCompare(listItemsToShuffle[ie].id) === 1)) {
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
input.addEventListener("keydown", (event) => {
    if (event.key === 'Enter' && input.value) {
        onClick();
    }
});
sortBtnAsc.addEventListener("click", () => {
    if (sortBtnAsc.classList.contains('sort-toggled')) {
        sortById();
    } else {
        sortAsc();
    }
});
sortBtnDesc.addEventListener("click", () => {
    if (sortBtnDesc.classList.contains('sort-toggled')) {
        sortById();
    } else {
        sortDesc();
    }
});


// Hide Completed functionality needs to extend from just Sort A-Z to other functions too
// add code so checking an item when Hide Completed is ticked removes it from list (needs to be added to other array)
// Some items seems to be created with hover-on. Others not, to investigate