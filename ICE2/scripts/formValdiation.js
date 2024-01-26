console.log("formValidation.js loaded");

/**
 * Validate the email address
 * @param {string} email    the email address to validate
 * @returns {boolean}        to indicate if the email is valid
 */
function validateEmailAddressSimple(emailString) {
    console.log('in ValidateEmailAddress');

    // check for @ sign
    let atSymbol = emailString.indexOf('@');
    if(atSymbol < 1) return false;

    let dot = emailString.indexOf('.');
    if(dot <= atSymbol + 2) return false;

    // check that the dot is not at the end
    if (dot === emailString.length - 1) return false;

    return true;
}

/*
 * Validate the email address
* @param {string} emailString
* @returns {boolean}    validation result
*/
function validateEmailAddressRegex(emailString) {
    //the regular expression to validate the email address for string+string|number bewten 2-20 characters
    // note the / and / at the beginning and end of the expression
    var emailRegex = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;

    //return true if the email address is valid - how to use regex
	return !!emailString && typeof emailString === 'string'
		&& emailString.match(emailRegex);
}


document.addEventListener('DOMContentLoaded', function () {
     // Function to validate the username
    function isUsernameValid(username) {
        // regex to allow only letters, numbers and underscore
        // Source: User Amir at https://stackoverflow.com/questions/9628879/javascript-regex-username-validation
        const regex = /^[a-zA-Z0-9_]+$/;
    
        return regex.test(username);
        }
  
    // Function to handle form submission
    function validateForm(event) {

        // Prevent the form from submitting initially
        event.preventDefault(); 
  
        // Reset error messages
        document.getElementById('generalError').innerText = '';
        document.getElementById('generalError').style.backgroundColor = '';
    
        // Get the value of the username input
        var usernameInput = document.getElementById('usernameInput').value;
    
        // Validate the username
        if (!isUsernameValid(usernameInput)) {
            // If username is not valid, display error message and red highlight
            // Update generalError with error message
            document.getElementById('generalError').innerText =
            'Invalid username. Please use only letters, numbers, and underscores.';
            //Update generalError with red background
            document.getElementById('generalError').style.backgroundColor = 'red';
        } else {
            // Log success message
            console.log('Form submitted successfully!');
        }
    }
  
    // Attach the validateForm function to the form's submit event
    var registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
      registrationForm.addEventListener('submit', validateForm);
    }
  });
  
//TODO:
// Make all fields required (HTML)
// Add a pattern attribute in the telephone element (HTML)
// Ensure the password is redacted into dots on screen when typed in (HTML)
// Create a function that knows if the username is valid (feel free to grab some RegEx from the Interwebs - cite source and test it!)
// If it is not valid, be sure to update the #generalError <p></p> with a good error message and some highlighting (red background, maybe?)
// Validate the username when the form is submitted
// Clear any additional error message and highlighting when the form is reset
// COMMENT EVERYTHING :D
