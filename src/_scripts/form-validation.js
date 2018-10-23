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

    function validateFormSubmission() {
        if ( !isRequiredInputEmpty() ) {
            enableFormSubmitButton();
        } else {
            disableFormSubmitButton();
        }
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

        return requiredInputsArray.length === filledInputs ? false : true;
    }

    function enableFormSubmitButton() {
        formSubmitButton.disabled = false;
    }

    function disableFormSubmitButton() {
        formSubmitButton.disabled = true;
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

    function displaySuccessfulMessage() {
        setTimeout(function() {
            form.classList.add('libertex-form--success');
            resetForm();

            setTimeout(function() {
                form.classList.remove('libertex-form--success');
            }, 4000);
        }, 2000);
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
        var errorMessageContainer = input.nextSibling;

        errorMessageContainer.innerHTML = message;
    }

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

}

module.exports = FormValidation;
