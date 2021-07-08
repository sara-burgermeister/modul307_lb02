const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const mobile = document.getElementById('mobile');
const password2 = document.getElementById('password2');
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


// Check that in field "phonenumber" can just be put numbers in it


/*function checkMobile(input) {
    // Get the value of the input field with id="numb"
    let x = document.getElementById("mobile").value;
    // If x is Not a Number or less than one or greater than 10
    let text;
    if (isNaN(x)) {
        text = "Input not valid";
    } else {
        text = "Input OK";
    }
    document.getElementById("demo").innerHTML = text;
}*/

/* Aufgabe:
    Validieren Sie die Mobile-Nummer ähnlich wie bei der Email mit einer
    Regular expression (regex). Für eine geeignete regex suchen Sie
    im Internet nach "javascript regular expression for mobile number".
*/

// Check required fields
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function(input) {
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
// Check passwords match
function checkPassword(input) {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'ähnlich wie in den anderen Beispielen');
    }
}
/* Aufgabe:
    Validieren Sie, ob die beiden Passwörter übereinstimmen.
    Falls sie nicht übereinstimmen, geben Sie (ähnlich wie in den anderen Beispielen)
    eine Fehlermeldung dem Formular aus.
*/
// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
function validateForm(){
    if(!checkRequired([username, email, password, firstname, lastname, mobile])){
        //Aufgabe: Validierung der Länge für Vorname (2 bis 20) und Nachname (2 bis 50)
        checkLength(firstname, 2, 20);
        checkLength(lastname, 2, 50);
        checkLength(username, 3, 15);
        checkLength(password, 6, 25);
        checkLength(mobile, 9, 10);
        /* Aufgabe:
          Validierung der Telefonnummer ähnlich wie bei der Email mit einer
          Regular expression (regex). Für eine geeignete regex suchen Sie
          im Internet nach "javascript regular expression for mobile number"
        * */
        checkMobile(mobile);
        checkEmail(email);
        checkPassword(password);
        /* Aufgabe:
          Validierung Sie die beiden Passwörter, damit password
          mit password2 übereinstimmt.
        * */
    }
}

// Event listeners
form.addEventListener('submit', function(e) {
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    e.preventDefault();
    //First validate form
    validateForm();
});

