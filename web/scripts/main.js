(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var FormValidation = function() {
    var formSubmitButton = document.querySelector('button[type=submit]');
    var form = document.querySelector('.libertex-form');
    var formInputs = document.querySelectorAll('.libertex-form__input');
    var nameInput = document.getElementById('name');
    var surnameInput = document.getElementById('surname');
    var phoneInput = document.getElementById('phone');
    var emailInput = document.getElementById('email');

    form.addEventListener('blur', validateFormSubmission, true);

    form.addEventListener('focus', hideErrorMessages, true);

    function hideErrorMessages() {
        var errorMessage = document.querySelector('.libertex-form__input--error');

        if (errorMessage) {
            errorMessage.classList.remove('libertex-form__input--error');
        }
    }

    function resetForm() {
        var formInputsArray = [].slice.call(formInputs);

        formInputsArray.forEach(function(input) {
            input.value = '';
        });
    }

    function validateFormSubmission() {
        if ( !isRequiredInputEmpty() ) {
            enableFormSubmitButton();
        }
    }

    function enableFormSubmitButton() {
        formSubmitButton.disabled = false;
    }

    function disableFormSubmitButton() {
        formSubmitButton.disabled = true;
    }

    function isRequiredInputEmpty() {
        var requiredInputs = document.querySelectorAll('input[required]');
        var requiredInputsArray = [].slice.call(requiredInputs);
        var filledInputs = 0;

        requiredInputsArray.forEach(function(input) {
            var inputValue = input.value;

            if (inputValue !== '') {
                filledInputs++;
            }
        });

        return requiredInputsArray.length === filledInputs;
    }

    formSubmitButton.addEventListener('click', submitForm, true);

    function submitForm(event) {
        event.preventDefault();
        disableFormSubmitButton();

        var inputValuesAreValid = validateInputValues();

        if (inputValuesAreValid) {
            displaySuccessfulMessage();
            disableFormSubmitButton();
        } else {
            catchFormValidationError();
            enableFormSubmitButton();
        }
    }

    function displaySuccessfulMessage() {
        setTimeout(function() {
            form.classList.add('libertex-form--success');
            resetForm();

            setTimeout(function() {
                form.classList.remove('libertex-form--success');
            }, 4000);
        }, 2000);
    }

    function validateInputValues() {
        var isInputValuesValid = false;

        if (
            valueDontContainNumbers(nameInput.value) &&
            valueDontContainNumbers(surnameInput.value) &&
            valueIsValidPhone(phoneInput.value) &&
            valueIsValidEmail(emailInput.value)
        ) {
            isInputValuesValid = true;
        }

        return isInputValuesValid;
    }

    function valueDontContainNumbers(value) {
        var regexCondition = /^[a-z]+$/i;
        return regexCondition.test(value);
    }

    function valueIsValidPhone(value) {
        var regexCondition = /^[+]*[(]{0,1}[0-9 ]{1,4}[)]{0,1}[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\.0-9]*$/g;
        return regexCondition.test(value);
    }

    function valueIsValidEmail(value) {
        var regexCondition = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/g;

        if (value !== '') {
            return regexCondition.test(value);
        } else {
            return true;
        }
    }

    function catchFormValidationError() {

        switch (false) {
            case valueDontContainNumbers(nameInput.value):
                displayErrorMessage(nameInput, 'This field should be only letters');
                break;
            case valueDontContainNumbers(surnameInput.value):
                displayErrorMessage(surnameInput, 'This field should be only letters');
                break;
            case valueIsValidPhone(phoneInput.value):
                displayErrorMessage(phoneInput, 'Please enter a valid phone number');
                break;
            case valueIsValidEmail(emailInput.value):
                displayErrorMessage(emailInput, 'Please enter a valid email address');
                break;
        }
    }

    function displayErrorMessage(input, message) {
        input.classList.add('libertex-form__input--error');

        //console.log(document.querySelectorAll('.libertex-form__input--error'));
        input.nextSibling.innerHTML = message;
    }
}

module.exports = FormValidation;

},{}],2:[function(require,module,exports){
'use strict';

var FormValidation = require('./form-validation');
var TableGenerator = require('./table-generator');

(function() {
    new FormValidation();
    new TableGenerator();
})();

},{"./form-validation":1,"./table-generator":3}],3:[function(require,module,exports){
'use strict';

var TableGenerator = function() {
    var tableData = [
        {
            money: 5321,
            account: "123 456 000",
            country: "rusia"
        },
        {
            money: 3000,
            account: "425 238 238",
            country: "spain"
        },
        {
            money: 890,
            account: "123 543 548",
            country: "china"
        },
        {
            money: 777,
            account: "090 235 453",
            country: "rusia"
        },
        {
            money: 666,
            account: "009 281 443",
            country: "spain"
        },
        {
            money: 555,
            account: "515 654 522",
            country: "china"
        },
        {
            money: 444,
            account: "765 452 241",
            country: "rusia"
        },
        {
            money: 333,
            account: "562 183 816",
            country: "spain"
        },
        {
            money: 222,
            account: "642 452 555",
            country: "china"
        },
        {
            money: 111,
            account: "212 552 112",
            country: "rusia"
        }
    ];
    var table = document.querySelector('.libertex-ranking__table');
    var tableBody = document.querySelector('.libertex-ranking__table-body');
    var tableRows = tableBody.querySelectorAll('.libertex-ranking__table-row');

    function populateTableWithData() {
        var tableSortCriteriaInLocalStorage = isTableSorCriteriaInLocalStorage();

        if (tableSortCriteriaInLocalStorage) {
            var orderedTableData =
                tableData.concat().sort(compareValues(tableSortCriteriaInLocalStorage));
            getCellsData(orderedTableData);
        } else {
            getCellsData(tableData);
        }

        setActiveSort(tableSortCriteriaInLocalStorage);
    }

    function isTableSorCriteriaInLocalStorage() {
        return JSON.parse(localStorage.getItem('libertex-table-sort-criteria'));
    }

    function getCellsData(data) {

        data.forEach(function(row, index) {
            var rowCells = tableRows[index].querySelectorAll('.libertex-ranking__table-cell');

            rowCells[0].innerHTML = '<span>' + row.money + '</span>';
            rowCells[1].innerHTML = '<span>' + row.account + '</span>';
            rowCells[2].innerHTML = '<img src="images/' + row.country + '.png" alt="'+ row.country +'" />';
        });
    }

    table.addEventListener('click', sortTableData, false);

    function sortTableData(event) {

        var targetParent = event.target.parentNode;

        if (targetParent.hasAttribute('data-sort')) {
            var sortCriteria = targetParent.getAttribute('data-sort');
            var orderedTableData =
                tableData.concat().sort(compareValues(sortCriteria));

            getCellsData(orderedTableData);
            setActiveSort(sortCriteria);
            saveTableSortCriteria(sortCriteria);
        }
    }

    function setActiveSort(sortCriteria) {
        var tableRows = tableBody.querySelectorAll('.libertex-ranking__table-row');
        var sortedCells = document.querySelectorAll('.libertex-ranking__table-cell--sorted');
        var sortedCellsArray = [].slice.call(sortedCells);
        var cellIndex = 0;

        if (sortCriteria === 'account') {
            cellIndex = 1;
        }

        if (sortCriteria === 'country') {
            cellIndex = 2;
        }

        sortedCellsArray.forEach(function(cell) {
            cell.classList.remove('libertex-ranking__table-cell--sorted');
        });

        for (var rowIndex = 0; rowIndex <= 2; rowIndex++) {
            var cells = tableRows[rowIndex].querySelectorAll('.libertex-ranking__table-cell');

            cells[cellIndex].classList.add('libertex-ranking__table-cell--sorted');
        }
    }

    function compareValues(key) {
        return function(a, b) {

            var comparison = 0;
            if (a[key] > b[key]) {
                comparison = 1;
            } else if (a[key] < b[key]) {
                comparison = -1;
            }

            return comparison * -1;
        };
    }

    function saveTableSortCriteria(sortCriteria) {
        localStorage.setItem('libertex-table-sort-criteria', JSON.stringify(sortCriteria));
    }

    populateTableWithData();
}

module.exports = TableGenerator;

},{}]},{},[2])

//# sourceMappingURL=main.js.map
