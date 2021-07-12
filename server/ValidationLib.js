// Show input error message

/**
 * Beschreibung
 * @param id: Identifikation des eingegebenen Datenelement
 * @param message: Fehlermeldung
 * @returns {string}
 */
function showError(id, message) {
    return `${id}: ${message}`;
}

// Show success outline
function showSuccess(id) {
    return `${id} successfully validated!`;
}

// Check email is valid
function checkEmail(id,input) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(input.trim())) {
        result = {
            isNotValid: true,
            msg: showError(id, 'Email is not valid')
        }
    }
    return result;
}

// Check username is valid
function checkUsername(id,input) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    const re = /^[a-zA-Z\-]+$/;
    if (!re.test(input.trim())) {
        result = {
            isNotValid: true,
            msg: showError(id, 'Username is not valid')
        }
    }
    return result;
}

// Check name is valid
// Eigenes Modul
function checkName(id,input) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    const re = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!re.test(input.trim())) {
        result = {
            isNotValid: true,
            msg: showError(id, 'Name is not valid')
        }
    }
    return result;
}

// Check mobile is valid
function checkMobile(id,input) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!re.test(input.trim())) {
        result = {
            isNotValid: true,
            msg: showError(id, 'Phonenumber is not valid')
        }
    }
    return result;
}

function checkPassword(id,input) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!re.test(input.trim())) {
        result = {
            isNotValid: true,
            msg: showError(id, 'Password is not valid')
        }
    }
    return result;
}


//TODO: Check article for throwing errors in node js
// https://stackoverflow.com/questions/33086247/throwing-an-error-in-node-js

// Check required fields
function checkRequired(id, input) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    //if input is empty ...
    if (input.trim() === '') {
        //.. then it's not valid
        result = {
            isNotValid: true,
            msg: showError(id, `${input.toString()} is required`)
        }
    }
    //return validation result
    return result;
}

// Check input length
function checkLength(id, input, min, max) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    };
    if (input.length < min) {
        result = {
            isNotValid: true,
            msg: showError(id,
            `${id} must be at least ${min} characters`)
        }
    } else if (input.length > max) {
        result = {
            isNotValid: true,
            msg: showError(id,
                `${id} must be less than ${max} characters`)
        }
    }
    return result;
}

/**
 *  Export validation functions for further usage.
 *  function to export WITHOUT brackets!
 */
module.exports = {
    checkEmail,
    checkUsername,
    checkName,
    checkMobile,
    checkPassword,
    checkLength,
    checkRequired
}
