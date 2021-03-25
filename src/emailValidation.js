function createValidator() {
    const emailInput = document.querySelector('.email--input');

    const validate = input => {
        const reEmail = new RegExp('[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}');

        if (!input.value) {
            return 'empty';
        }
        else if (reEmail.test(input.value.toUpperCase())) {
            return input.value;
        } else {
            return false;
        }
    }

    return document.querySelector('.email--button').addEventListener('click', () => {
        const responseMessage = document.querySelector('.email--validation-copy');
        const validEmail = validate(emailInput);


        if (validEmail === 'empty') {
          responseMessage.style.color = null;
          responseMessage.innerHTML = 'Please provide an email address.';
        } else if (validEmail) {
          responseMessage.style.color = '#25BD38';
          responseMessage.innerHTML = `Using ${validEmail}`;
        } else {
          responseMessage.style.color = null;
          responseMessage.innerHTML = 'Invalid email address.'
        }
    });
}
