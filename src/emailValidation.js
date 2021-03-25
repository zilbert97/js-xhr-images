function createValidator() {
    const emailInput = document.querySelector('.email--input');

    const validate = input => {
        const reEmail = new RegExp('[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}');

        if (reEmail.test(input.value.toUpperCase())) {
            console.log('VALID');
        } else {
            console.log('INVALID');
        }
    }

    return document.querySelector('.email--button').addEventListener('click', () => {
        validate(emailInput);
    });
}
