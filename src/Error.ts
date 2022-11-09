export class ErrorMsg {
    id: number
    isActive: boolean
    name: string
    text: string;
    
    constructor(id : number, name : string, text: string) {
        this.id = id
        this.isActive = false
        this.name = name
        this.text = text
    }
}

export class ErrorManager {
    
    errorMsgs : ErrorMsg[] = []
    formError : HTMLElement
    
    constructor(formError : HTMLElement, errorMsgs : ErrorMsg[]) {
        this.formError = formError
        this.errorMsgs = errorMsgs
    }

    setError(errorId: number) {
        if(errorId == -1) {
            this.errorMsgs.forEach(e=>e.isActive = false)
            this.setNextError()
            return;
        }
        if(this.errorMsgs.filter(e => e.isActive).length == 0) {
            this.errorMsgs[errorId].isActive = true
        } else if(this.errorMsgs.filter(e => e.id == errorId && !e.isActive)) {
            this.errorMsgs[errorId].isActive = true
        }
        this.setNextError()
    }

    setNextError = () => {
        let errorMsg = this.errorMsgs.filter(e => e.isActive)
        if(errorMsg.length > 0) {
            this.formError.style.display = 'block'
            this.formError.textContent = errorMsg[0].text
        } else {
            this.formError.style.display = 'none'
        }
    }

    removeError = (errorId : number) => {
        let activeErrors = this.errorMsgs.filter(e=> e.id == errorId && e.isActive) 
        if(activeErrors.length != 0){
            this.errorMsgs[errorId].isActive = false
            this.setNextError()
        }
    }
}


