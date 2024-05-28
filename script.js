    const cardNameInput = document.getElementById('cardName');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');
    const submitButton = document.getElementById('submitButton');
    const form = document.getElementById('creditCardForm');

    const cardNameRegex = /^(MasterCard|Visa|American Express)$/i;
    const cardNumberRegex = {
        'MasterCard': /^(5[1-5][0-9]{14})$/,
        'Visa': /^4([0-9]{12}|[0-9]{15})$/,
        'American Express': /^3[47][0-9]{13}$/
    };
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    const cvvRegex = /^[0-9]{3}$/;

    const validateInput = (input, regex) => {
        const value = input.value.trim();
        if (regex.test(value)) {
            input.classList.remove('invalid');
            input.classList.add('valid');
            return true;
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
            return false;
        }
    };

    const validateCardNumber = () => {
        const value = cardNumberInput.value.trim();
        const cardType = cardNameInput.value.trim();
        const regex = cardNumberRegex[cardType];
        return regex ? validateInput(cardNumberInput, regex) : false;
    };

    const validateForm = () => {
        const isNameValid = validateInput(cardNameInput, cardNameRegex);
        const isNumberValid = validateCardNumber();
        const isDateValid = validateInput(expiryDateInput, expiryDateRegex);
        const isCVVValid = validateInput(cvvInput, cvvRegex);
        submitButton.disabled = !(isNameValid && isNumberValid && isDateValid && isCVVValid);
    };

    const resetForm = () => {
        form.reset();
        [cardNameInput, cardNumberInput, expiryDateInput, cvvInput].forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        submitButton.disabled = true;
    };

    cardNameInput.addEventListener('input', () => {
        validateInput(cardNameInput, cardNameRegex);
        validateForm();
    });

    cardNumberInput.addEventListener('input', () => {
        validateCardNumber();
        validateForm();
    });

    expiryDateInput.addEventListener('input', () => {
        validateInput(expiryDateInput, expiryDateRegex);
        validateForm();
    });

    cvvInput.addEventListener('input', () => {
        validateInput(cvvInput, cvvRegex);
        validateForm();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Datos enviados correctamente');
        resetForm();
    });

