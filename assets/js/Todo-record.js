const Statuses = { ACTIVE: "active", DONE: "done" };

class ToDoRecord {
    status = "unknown";
    constructor(text) {
        this.setText(text);
        this.setStatus(Statuses.ACTIVE);
        this.id = this._getRandomId();
    }

    setText(text) {
        this.text = text;
    }
    getText() {
        return this.text;
    }

    setStatus(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
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
