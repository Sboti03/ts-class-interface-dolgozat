"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorManager = exports.ErrorMsg = void 0;
class ErrorMsg {
    constructor(id, name, text) {
        this.id = id;
        this.isActive = false;
        this.name = name;
        this.text = text;
    }
}
exports.ErrorMsg = ErrorMsg;
class ErrorManager {
    constructor(formError, errorMsgs) {
        this.errorMsgs = [];
        this.setNextError = () => {
            let errorMsg = this.errorMsgs.filter(e => e.isActive);
            if (errorMsg.length > 0) {
                this.formError.style.display = 'block';
                this.formError.textContent = errorMsg[0].text;
            }
            else {
                this.formError.style.display = 'none';
            }
        };
        this.removeError = (errorId) => {
            let activeErrors = this.errorMsgs.filter(e => e.id == errorId && e.isActive);
            if (activeErrors.length != 0) {
                this.errorMsgs[errorId].isActive = false;
                this.setNextError();
            }
        };
        this.formError = formError;
        this.errorMsgs = errorMsgs;
    }
    setError(errorId) {
        if (errorId == -1) {
            this.errorMsgs.forEach(e => e.isActive = false);
            this.setNextError();
            return;
        }
        if (this.errorMsgs.filter(e => e.isActive).length == 0) {
            this.errorMsgs[errorId].isActive = true;
        }
        else if (this.errorMsgs.filter(e => e.id == errorId && !e.isActive)) {
            this.errorMsgs[errorId].isActive = true;
        }
        this.setNextError();
    }
}
exports.ErrorManager = ErrorManager;
