let customSelect = document.getElementsByClassName("select__block");
let customSelectCount = customSelect.length;

for (let i = 0; i < customSelectCount; i++) {
    //наш список select
    const select = customSelect[i].getElementsByTagName("select")[0];
    //количество элеменьлв
    const countItemsSelect = select.length;

    //select item block
    let containerSelect = document.createElement("div");
    containerSelect.classList.add("select__block--selected")
    containerSelect.innerHTML = select.options[select.selectedIndex].innerHTML;
    customSelect[i].appendChild(containerSelect);

    // show/hide options list
    let selectList = document.createElement("div");
    selectList.className = "select__list select__list--hide";

    for (let j = 0; j < countItemsSelect; j++) {
        let item = document.createElement("div");
        item.classList.add("select__list-item")
        item.innerHTML = select.options[j].innerHTML;

        if (j === select.selectedIndex) {
            item.classList.add("same-as-selected")
        }

        item.addEventListener("click", (e) => handleClickOnItem(e, select));
        selectList.appendChild(item);
    }
    customSelect[i].appendChild(selectList);

    containerSelect.addEventListener("click", function(e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select__list--hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select__list");
    y = document.getElementsByClassName("select__block--selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select__list--hide");
        }
    }
}

function handleClickOnItem(e, select) {
    var y
    console.log("this: ", e.target)
    // let parentSelect = e.target.parentNode.parentNode.querySelector("select");
    console.log("parent: ", select)
    let countOptions = select.length;
    let customSelectBlock = e.target.parentNode.previousSibling;
    let dropDownList = e.target.parentNode;
    console.log("targer parent: ", e.target.parentNode)

    for (let i = 0; i < countOptions; i++) {
        if (select.options[i].innerHTML === e.target.innerHTML) {
            select.selectedIndex = i;
            customSelectBlock.innerHTML = e.target.innerHTML;

            y = dropDownList.querySelector(".same-as-selected");
            console.log("same as selected", y)
            // yl = y.length;
            if (y) {
                y.removeAttribute("class")
            }

            // for (k = 0; k < yl; k++) {
            //     y[k].removeAttribute("class");
            // }
            e.target.setAttribute("class", "same-as-selected");
            break;
        }
    }
    customSelectBlock.click();
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);