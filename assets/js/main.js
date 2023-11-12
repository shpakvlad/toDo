/*****************
 * DEBUG SECTION *
 *****************/
function msg(text = "ok or empty") {
    console.log(text);
} //FIXME: remove when release
/*****************/

let taskArray = [];

let addBtn = document.querySelector("#add-btn"); //add btn
addBtn.addEventListener("click", addRecord);

let recordText = document.querySelector("#todos"); //record text
recordText.addEventListener("keydown", (e) => {
    //input press enter
    if (e.code == "Enter") {
        addRecord();
    }
});

let todoList = document.querySelector("#todo-list"); //list

let colorBox = document.querySelectorAll('.color-img');
colorBox.forEach(element => {
    element.addEventListener('click', colorSelect);
});

let inputBox = document.querySelector('#input-box');


/************************************************/
/*                  FUNCTIONS                   */
/************************************************/
function addRecord() {
    // let text = document.querySelector("#todos");

    if (recordText != '') {
        const rec = new ToDoRecord(recordText.value);
        taskArray.push(rec);

        msg(taskArray); //FIXME:remove

        let newTask = appendTask(rec.getText());
        newTask.setAttribute("data-id", rec.id); //add id
        newTask.style.borderLeftColor = inputBox.style.borderLeftColor;    

        let recColor = rec.getId();
        changeColorInArray(recColor,inputBox.style.borderLeftColor );

        inputBox.style.borderLeftColor = 'transparent';

        todoList.append(newTask); //add task

        recordText.value = ""; //clear input

    } //TODO: add error msg if input empty
}

function appendTask(text) {
    let div = document.createElement("div");
    div.classList.add("record");
    div.classList.add("box-shadow");
    div.setAttribute("data-status", "active");

    let chk = document.createElement("input");
    chk.setAttribute("type", "checkbox");
    chk.setAttribute("name", "chkDone");
    chk.classList.add("doneChk");
    chk.addEventListener("click", doneRecord); //done
    div.append(chk);

    let recordTxt = document.createElement("p");
    recordTxt.textContent = text;
    div.append(recordTxt);

    let delBtn = document.createElement("input");
    delBtn.setAttribute("type", "button");
    delBtn.setAttribute("value", "remove");
    delBtn.classList.add("remove-btn");
    delBtn.classList.add("box-shadow");
    delBtn.classList.add("hover");
    delBtn.addEventListener("click", removeRecord);
    div.append(delBtn);

    return div;
}

function doneRecord(event) {
    let doneRec = this.parentElement;
    let chk = event.currentTarget.checked;
    let findId = doneRec.dataset.id;

    if (chk) {
        doneRec.setAttribute("data-status", "done");
        doneRec.classList.add('done');
        changeStatusInArray(findId, Statuses.DONE);

    } else {
        doneRec.setAttribute("data-status", "active");
        doneRec.classList.remove('done');
        changeStatusInArray(findId, Statuses.ACTIVE);
    }
}


function removeRecord() {
    this.parentElement.remove();
    removeRecordFromArray(this.parentElement.dataset.id);
}

function changeStatusInArray(findId, status) {
    let foundObj = taskArray.find((item) => {
        return item.id === findId;
    });
    foundObj.setStatus(status);
}

function changeColorInArray(findId, color) {
    let foundObj = taskArray.find((item) => {
        return item.id === findId;
    });
    foundObj.setColor(color);

    msg(todoList);
}

function removeRecordFromArray(id) {
    let foundPos = taskArray.findIndex((item) => item.id === id);
    taskArray.splice(foundPos, 1);
}

function colorSelect(event) {
    let box = event.target.id;

    switch (box) {
        case 'color-none':
            inputBox.style.borderLeftColor = 'transparent';
            break;
        case 'color-red':
            inputBox.style.borderLeftColor = '#fe688b';
            break;
        case 'color-green':
            inputBox.style.borderLeftColor = '#2aa889';
            break;
        case 'color-yellow':
            inputBox.style.borderLeftColor = '#ffb84d';
            break;
        case 'color-blue':
            inputBox.style.borderLeftColor = '#5c74f0';
            break;
    
        default:
            break;
    }
}