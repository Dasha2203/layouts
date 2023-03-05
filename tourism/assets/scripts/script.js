let customSelect = document.getElementsByClassName("select__block");
let customSelectCount = customSelect.length;

for (let i = 0; i < customSelectCount; i++) {
    const select = customSelect[i].getElementsByTagName("select")[0];
    const countItemsSelect = select.length;

    let containerSelect = document.createElement("div");
    containerSelect.classList.add("select__block--selected")
    containerSelect.innerHTML = select.options[select.selectedIndex].innerHTML;
    customSelect[i].appendChild(containerSelect);

    let selectList = document.createElement("div");
    selectList.className = "select__list select__list--hide";

    for (let j = 0; j < countItemsSelect; j++) {
        let item = document.createElement("div");
        item.classList.add("select__list-item")
        item.innerHTML = select.options[j].innerHTML;
        item.setAttribute("data-select-index", select.options[j].value)

        if (j === select.selectedIndex) {
            item.classList.add("same-as-selected")
        }

        item.addEventListener("click", (e) => handleClickOnItem(e, select));
        selectList.appendChild(item);
    }
    customSelect[i].appendChild(selectList);

    containerSelect.addEventListener("click", function(e) {
        e.stopPropagation();
        closeSelect(e.target);
        e.target.nextSibling.classList.toggle("select__list--hide");
    });
}

function closeSelect(e) {
    let selectList = document.getElementsByClassName("select__list");
    let selectedBlock = document.getElementsByClassName("select__block--selected");

    for (let i = 0; i < selectedBlock.length; i++) {
        if (e !== selectedBlock[i]) {
            selectList[i].classList.add("select__list--hide");
        }
    }
}

function handleClickOnItem(e, select) {
    let customSelectBlock = e.target.parentNode.previousSibling;
    let dropDownList = e.target.parentNode;

    select.selectedIndex = e.target.getAttribute("data-select-index");
    customSelectBlock.innerHTML = e.target.innerHTML;

    let selectedItem = dropDownList.querySelector(".same-as-selected");

    if (selectedItem) {
        selectedItem.removeAttribute("class")
    }

    e.target.setAttribute("class", "same-as-selected");
    customSelectBlock.click();
}

document.addEventListener("click", closeSelect);