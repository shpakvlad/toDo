const Statuses = {ACTIVE: 'active', DONE: 'done', EXPIRED: 'expired'};

class TodoRecord {
    constructor(text = '', color = 'transparent', status = 'active') {
        this._text = text;
        this._color = color;
        this._status = status;
        this._id = this._getRandomId();
    }
    
    set text(text) {
        this._text = text;
    }
    get text() {
        return this._text;
    }

    set color(color) {
        this._color = color;
    }
    get color() {
        return this._color;
    }

    set status(status) {
        this.status = status;
    }
    get status() {
        return this._status;
    }

    set id(id) {
        this._id = id;
    }
    get id() {
        return this._id;
    }

    _getRandomId() {
        var digits = "0123456789";
        var id = "";
        for (var i = 0; i < 10; i++) {
            id += digits[Math.floor(Math.random() * 10)];
        }
        return id;
    }
}

// class ToDoRecord {
//     status = "unknown";
//     constructor(text) {
//         this.setText(text);
//         this.setStatus(Statuses.ACTIVE);
//         this.id = this._getRandomId();
//         this.setColor('none');
//     }

    
//     setText(text) {
//         this.text = text;
//     }
//     getText() {
//         return this.text;
//     }

//     setStatus(status) {
//         this.status = status;
//     }
//     getStatus() {
//         return this.status;
//     }

//     setColor(color) {
//         this.color = color;
//     }
//     getColor() {
//         return this.color;
//     }

//     setId(id) {
//         this.id = id;
//     }

//     getId() {
//         return this.id;
//     }

//     _getRandomId() {
//         var digits = "0123456789";
//         var id = "";
//         for (var i = 0; i < 10; i++) {
//             id += digits[Math.floor(Math.random() * 10)];
//         }
//         return id;
//     }
// }
