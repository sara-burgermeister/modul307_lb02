const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const name = document.getElementById('name');
const mobile = document.getElementById('mobile');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkName(input) {
    const re = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'First name is not valid');
    }
}


function checkUsername(input) {
    const re = /^[a-zA-Z\-]+$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Username is not valid');
    }
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

function checkMobile(input) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Phone is not valid');
    }
}

// Check required fields
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });
    return isRequired;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
    } else {
        showSuccess(input);
    }
}

/**
 * Check complexity of the password in order to make guessing difficult
 * @param input
 */
function checkPassword(input) {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Password is not valid');
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateForm() {
    if (!checkRequired([username, email, password, name, mobile])) {
        checkLength(name, 2, 60);
        checkLength(username, 3, 15);
        checkLength(password, 10, 25);
        checkLength(mobile, 9, 10);
        checkName(name);
        checkUsername(username);
        checkMobile(mobile);
        checkEmail(email);
        checkPassword(password);
    }
}

// Event listeners
form.addEventListener('submit', function (e) {
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    e.preventDefault();
    //First validate form
    validateForm();
});

