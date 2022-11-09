import { Artwork } from "./Artwork";
import { ErrorManager, ErrorMsg } from "./Error";
import { Statue } from "./Statue";

document.addEventListener('DOMContentLoaded', () => {
    let formError = document!.getElementById('form-error') as HTMLElement
    let errorMsgs: ErrorMsg[] = []
    errorMsgs.push(new ErrorMsg(0, 'wrong-title', 'Please enter a valid title'))
    errorMsgs.push(new ErrorMsg(1, 'wrong-year', 'Please enter a year'))
    errorMsgs.push(new ErrorMsg(2, 'wrong-price', 'Please enter a valid price'))
    errorMsgs.push(new ErrorMsg(3, 'wrong-height', 'Please enter a height'))
    let errorManager = new ErrorManager(formError, errorMsgs)

    errorManager.setError(-1)

    let artWorks : Artwork[] = []
    writeOut()

    document.getElementById('title')!.addEventListener('change', e => {
        let title = (e.currentTarget as HTMLInputElement).value
        if (titleTest(title)) {
            errorManager.setError(0)
        } else {
            errorManager.removeError(0)
        }
    })
    document.getElementById('year')!.addEventListener('change', e => {
        let year = (e.currentTarget as HTMLInputElement).value
        if (yearTest(year)) {
            errorManager.setError(1)
        } else {
            errorManager.removeError(1)
        }
    })

    document.getElementById('price')!.addEventListener('change', e => {
        let price = e.currentTarget as HTMLInputElement
        if (priceTest(price.value)) {
            errorManager.setError(2)
        } else {
            errorManager.removeError(2)
        }
    })
    document.getElementById('height')!.addEventListener('change', e => {
        let height = e.currentTarget as HTMLInputElement
        if (heightTest(height.value)) {
            errorManager.setError(3)
        } else {
            errorManager.removeError(3)
        }
    })

    document.getElementById('add')!.addEventListener('click', () => {
        let title = (document.getElementById('title') as HTMLInputElement).value
        let height = (document.getElementById('height') as HTMLInputElement).value
        let price = (document.getElementById('price') as HTMLInputElement).value
        let year = (document.getElementById('year') as HTMLInputElement).value

        if (!titleTest(title) && !yearTest(year) && !priceTest(price) && !heightTest(height)) {
            artWorks.push(new Statue(title, parseInt(year), parseInt(price), parseInt(height)));
            (document.getElementById('title') as HTMLInputElement).textContent = ''
            writeOut()
        }
    })

    function writeOut() {
        let out = document!.getElementById('out') as HTMLElement
        let allPirce = 0
        artWorks.forEach(e=>allPirce +=e.price)
        console.log(artWorks.length + 'db mű ' + allPirce + 'Ft összesen')
        out.textContent = artWorks.length + 'db mű ' + allPirce + 'Ft összesen'
    }
});


function titleTest(title: string) {
    let pattern = /^[a-zA-Z\s]+$/
    if (title === '' || title.length == 0 || !pattern.test(title)) {
        return true
    } else {
        return false
    }
}

function yearTest(yearString: string) {
    let year: number = parseInt(yearString)
    console.log(isNaN(year))
    if (isNaN(year) || year > new Date().getFullYear()) {
        return true
    } else {
        return false
    }
}

function priceTest(priceString: string) {

    let price: number = parseInt(priceString)
    if (isNaN(price) || price <= 0) {
        return true
    } else {
        return false
    }
}

function heightTest(heightString: string) {

    let height: number = parseInt(heightString)
    if (isNaN(height) || height <= 10) {
        return true
    } else {
        return false
    }
}

