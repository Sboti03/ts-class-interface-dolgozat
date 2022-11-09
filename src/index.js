"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("./Error");
const Statue_1 = require("./Statue");
document.addEventListener('DOMContentLoaded', () => {
    let formError = document.getElementById('form-error');
    let errorMsgs = [];
    errorMsgs.push(new Error_1.ErrorMsg(0, 'wrong-title', 'Please enter a valid title'));
    errorMsgs.push(new Error_1.ErrorMsg(1, 'wrong-year', 'Please enter a year'));
    errorMsgs.push(new Error_1.ErrorMsg(2, 'wrong-price', 'Please enter a valid price'));
    errorMsgs.push(new Error_1.ErrorMsg(3, 'wrong-height', 'Please enter a height'));
    let errorManager = new Error_1.ErrorManager(formError, errorMsgs);
    errorManager.setError(-1);
    let artWorks = [];
    writeOut();
    document.getElementById('title').addEventListener('change', e => {
        let title = e.currentTarget.value;
        if (titleTest(title)) {
            errorManager.setError(0);
        }
        else {
            errorManager.removeError(0);
        }
    });
    document.getElementById('year').addEventListener('change', e => {
        let year = e.currentTarget.value;
        if (yearTest(year)) {
            errorManager.setError(1);
        }
        else {
            errorManager.removeError(1);
        }
    });
    document.getElementById('price').addEventListener('change', e => {
        let price = e.currentTarget;
        if (priceTest(price.value)) {
            errorManager.setError(2);
        }
        else {
            errorManager.removeError(2);
        }
    });
    document.getElementById('height').addEventListener('change', e => {
        let height = e.currentTarget;
        if (heightTest(height.value)) {
            errorManager.setError(3);
        }
        else {
            errorManager.removeError(3);
        }
    });
    document.getElementById('add').addEventListener('click', () => {
        let title = document.getElementById('title').value;
        let height = document.getElementById('height').value;
        let price = document.getElementById('price').value;
        let year = document.getElementById('year').value;
        if (!titleTest(title) && !yearTest(year) && !priceTest(price) && !heightTest(height)) {
            artWorks.push(new Statue_1.Statue(title, parseInt(year), parseInt(price), parseInt(height)));
            document.getElementById('title').textContent = '';
            writeOut();
        }
    });
    function writeOut() {
        let out = document.getElementById('out');
        let allPirce = 0;
        artWorks.forEach(e => allPirce += e.price);
        console.log(artWorks.length + 'db mű ' + allPirce + 'Ft összesen');
        out.textContent = artWorks.length + 'db mű ' + allPirce + 'Ft összesen';
    }
});
function titleTest(title) {
    let pattern = /^[a-zA-Z\s]+$/;
    if (title === '' || title.length == 0 || !pattern.test(title)) {
        return true;
    }
    else {
        return false;
    }
}
function yearTest(yearString) {
    let year = parseInt(yearString);
    console.log(isNaN(year));
    if (isNaN(year) || year > new Date().getFullYear()) {
        return true;
    }
    else {
        return false;
    }
}
function priceTest(priceString) {
    let price = parseInt(priceString);
    if (isNaN(price) || price <= 0) {
        return true;
    }
    else {
        return false;
    }
}
function heightTest(heightString) {
    let height = parseInt(heightString);
    if (isNaN(height) || height <= 10) {
        return true;
    }
    else {
        return false;
    }
}
