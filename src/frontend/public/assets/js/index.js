import {
    onBlurUserName, onBlurName, onBlurPassword,
    onBlurConfirmPassword, onBlurBirthDate, onBlurCPF,
    onBlurPhone, onBlurEmail, onBlurCEP, onBlurCity,
    onBlurState, onBlurNeighborhood, onBlurStreet,
    onBlurNumber, onCpfChange, onPhoneChange, onCEPChange
} from './ui.js';

/**
 * @type {function(string):Element}
 */
const $ = document.querySelector.bind(document);

$("#username").onBlur(onBlurUserName);
$("#name").onBlur(onBlurName);
$("#password").onBlur(onBlurPassword);
$("#confirmpassword").onBlur(onBlurConfirmPassword);
$("#cpf").onBlur(onBlurCPF).onInput(onCpfChange);
$("#birthdate").onBlur(onBlurBirthDate);
$("#phone").onBlur(onBlurPhone).onInput(onPhoneChange);
$("#email").onBlur(onBlurEmail);
$("#cep").onBlur(onBlurCEP).onInput(onCEPChange);
$("#city").onBlur(onBlurCity);
$("#uf").onBlur(onBlurState);
$("#neighborhood").onBlur(onBlurNeighborhood);
$("#street").onBlur(onBlurStreet);
$("#number").onBlur(onBlurNumber);

$("#register").addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelectorAll("#register input")
        .forEach(e => {
            e.focus();
            e.blur();
        });
});
