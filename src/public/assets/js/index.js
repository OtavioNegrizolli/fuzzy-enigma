import {
    onBlurUserName, onBlurName, onBlurPassword,
    onBlurConfirmPassword, onBlurBirthDate, onBlurCPF,
    onBlurChildrenNumber, onBlurPhone,  
    onBlurEmail, onBlurCEP, onBlurCity, 
    onBlurState, onBlurNeighborhood, onBlurStreet, 
    onBlurNumber, onCpfChange, clearNonDigit,
    onPhoneChange, onCEPChange
} from './ui.js';

/**
 * @type {function(string):Element}
 */
const $ = document.querySelector.bind(document);

$("#username").onBlur(onBlurUserName);
$("#firstname").onBlur(onBlurName);
$("#lastname").onBlur(onBlurName);
$("#password").onBlur(onBlurPassword);
$("#confirmpassword").onBlur(onBlurConfirmPassword);
$("#cpf").onBlur(onBlurCPF).onInput(onCpfChange);
$("#birthdate").onBlur(onBlurBirthDate);
$("#children").onBlur(onBlurChildrenNumber).onInput(clearNonDigit);
$("#phone").onBlur(onBlurPhone('#phone2')).onInput(onPhoneChange);
$("#phone2").onBlur(onBlurPhone('#phone')).onInput(onPhoneChange);
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
