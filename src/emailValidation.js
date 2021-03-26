function createValidator() {
    const emailInput = document.querySelector('.email--input');

    const validate = input => {
        const reEmail = new RegExp('[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}');
        const responseMessage = document.querySelector('.email--validation-copy');

        if (!input.value) {
            responseMessage.style.color = null;
            responseMessage.innerHTML = 'Please provide an email address.';
            return 'empty';
        }
        else if (reEmail.test(input.value.toUpperCase())) {
            responseMessage.style.color = '#25BD38';
            responseMessage.innerHTML = `Using ${input.value}`;
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
