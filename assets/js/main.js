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

function addRecord() {
    // let text = document.querySelector("#todos");

    if (recordText) {
        const rec = new ToDoRecord(recordText.value);
        taskArray.push(rec);

        msg(taskArray); //FIXME:remove

        let newTask = appendTask(rec.getText());
        newTask.setAttribute("data-id", rec.id); //add id
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

    msg(taskArray); //FIXME:remove
}


function removeRecord() {
    this.parentElement.remove();

    removeRecordFromArray(this.parentElement.dataset.id);
}

function changeStatusInArray(findId, status) {
    let foundObj = taskArray.find((item) => {
        return item.id === findId;
    });

    foundObj.status = status;
}

function removeRecordFromArray(id) {
    let foundPos = taskArray.findIndex((item) => item.id === id);

    taskArray.splice(foundPos, 1);

    msg(taskArray); //FIXME:remove
}
