/**
 * A closure to return an email validator.
 *
 * @return {function} - Email validator function.
 */
function createValidator() {
    const emailInput = document.querySelector('.email--input');

    /**
     * Performs email validation based on the text on the input field.
     *
     * @param  {element}     - Email input field to perform validation on.
     * @return {string|bool} - Returns 'empty' string if no value on the input,
     *                         the user's email address as a string if valid,
     *                         or false if the user's email is invalid.
     */
    const validate = input => {
        const reEmail = new RegExp('[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}');
        const responseMessage = document.querySelector('.email--validation-copy');

        if (!input.value) {
            responseMessage.style.color = null;
            responseMessage.innerHTML = 'Please provide an email address.';
            return 'empty';
        }
        else if (reEmail.test(input.value.toUpperCase())) {
            return input.value;
        } else {
            responseMessage.style.color = null;
            responseMessage.innerHTML = 'Invalid email address.'
            return false;
        }
    }

    return function() {
        return validate(emailInput);
    };

}
