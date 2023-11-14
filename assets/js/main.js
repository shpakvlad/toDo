/*****************
 * DEBUG SECTION *
 *****************/
function msg(text = 'ok or empty') {
    console.log(text);
} //FIXME: remove when release
/*****************/

let taskArray = [];

let addBtn = document.querySelector('#add-btn'); //add btn
addBtn.addEventListener('click', addRecord);

let recordText = document.querySelector('#todos'); //record text
recordText.addEventListener('keydown', (e) => {
    //input press enter
    if (e.code == 'Enter') {
        addRecord();
    }
});

let todoList = document.querySelector('#todo-list'); //list

let colorBox = document.querySelectorAll('.color-img');
colorBox.forEach(element => {
    element.addEventListener('click', colorSelect);
});

let inputBox = document.querySelector('#input-box');


/************************************************/
/*                  FUNCTIONS                   */
/************************************************/
function addRecord() {
    if (recordText.value != '') {

        const rec = new TodoRecord(recordText.value, inputBox.style.borderLeftColor);
        taskArray.push(rec);

        let newTask = appendTask(rec.text);

        newTask.setAttribute('data-id', rec.id); //add id
        newTask.style.borderLeftColor = inputBox.style.borderLeftColor;    

        inputBox.style.borderLeftColor = 'transparent'; //reset color

        todoList.append(newTask); //add task

        recordText.value = ''; //clear input

    } //TODO: add error msg if input empty
}

function appendTask(text) {
    let div = document.createElement('div');  //record
    div.classList.add('record');
    div.classList.add('box-shadow');
    div.setAttribute('data-status', 'active');

    let chk = document.createElement('input');   //done 
    chk.setAttribute('type', 'checkbox');
    chk.setAttribute('name', 'chkDone');
    chk.classList.add('doneChk');
    chk.addEventListener('click', doneRecord); 
    div.append(chk);

    let recordTxt = document.createElement('p'); //text rec
    recordTxt.textContent = text;
    div.append(recordTxt);

    let btnBlock = document.createElement('div'); //btn block
    btnBlock.classList.add('btn-block');

    let edtBtn = document.createElement('ion-icon'); //edit btn
    edtBtn.setAttribute('value', 'remove');
    edtBtn.setAttribute('name', 'create');
    edtBtn.classList.add('edit-btn');
    edtBtn.classList.add('box-shadow');
    edtBtn.classList.add('hover');
    edtBtn.addEventListener('click', editRecord);
    btnBlock.append(edtBtn);

    let delBtn = document.createElement('ion-icon'); //remove btn
    delBtn.setAttribute('value', 'remove');
    delBtn.setAttribute('name', 'trash');
    delBtn.classList.add('remove-btn');
    delBtn.classList.add('box-shadow');
    delBtn.classList.add('hover');
    delBtn.addEventListener('click', removeRecord);
    btnBlock.append(delBtn);

    div.append(btnBlock);
    return div;
}

function doneRecord(event) {
    let doneRec = this.parentElement;
    let chk = event.currentTarget.checked;
    let findId = doneRec.dataset.id;

    if (chk) {
        doneRec.setAttribute('data-status', 'done');
        doneRec.classList.add('done');
        changeStatusInArray(findId, Statuses.DONE);

    } else {
        doneRec.setAttribute('data-status', 'active');
        doneRec.classList.remove('done');
        changeStatusInArray(findId, Statuses.ACTIVE);
    }
}

function editRecord(event) {
    let text = event.currentTarget.parentElement.previousSibling.textContent;
    let colorElem = event.currentTarget.parentElement.parentElement;
    let color = colorElem.style.borderLeftColor;

    recordText.value = text;
    inputBox.style.borderLeftColor = color;

    removeRecordFromArray(event.currentTarget.parentElement.parentElement.dataset.id);

    event.currentTarget.parentElement.parentElement.remove();
}

function removeRecord() {
    this.parentElement.parentElement.remove();
    removeRecordFromArray(this.parentElement.parentElement.dataset.id);
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
    foundObj.color = color;
}

function removeRecordFromArray(id) {
    let foundPos = taskArray.findIndex((item) => item.id === id);
    taskArray.splice(foundPos, 1);
}

function colorSelect(event) {
    let colorBox = event.target.id;

    switch (colorBox) {
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

/* ===== END ===== */