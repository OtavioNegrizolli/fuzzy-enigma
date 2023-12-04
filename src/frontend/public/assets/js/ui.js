import { validarCPF, getAddresCep } from './extra.js';
/**
 * @type {function(string):Element}
 */
const $ = document.querySelector.bind(document);
/**
 * 
 * @param {Event} evt 
 */
export function onBlurUserName(evt) {
    const v = evt.target.value;
    const isInvalid = v.value == null || v.value.length < 3 || v.value.length > 50;
    evt.target.setValidity(!isInvalid);
}

/**
 * 
 * @param {Event} evt 
 */
export function onBlurName(evt) {
    const v = evt.target.value;
    const isInvalid = v == null || v.length < 3 || v.length > 25 || /[\W]/ig.test(String(v).replace(' '));
    evt.target.setValidity(!isInvalid);
}

/**
 * 
 * @param {Event} evt 
 */
export function onBlurPassword(evt) {
    const v = evt.target.value;
    evt.target.setValidity(v != null && v.length >= 8);
}

/**
 * 
 * @param {Event} evt 
 */
export function onBlurConfirmPassword(evt) {
    const v = evt.target.value;
    const password = document.querySelector('#password')?.value;
    evt.target.setValidity(v != null && v == password);
}

/**
 * 
 * @param {Event} evt 
 */
export function onBlurCPF(evt) {
    const v = evt.target.value;
    evt.target.setValidity(v != null && validarCPF(v));
}

/**
 * @param {Event} evt 
 */
export function onBlurBirthDate(evt) {
    const v = evt.target.value;
    const date = new Date(v?.replace('-', '/'));
    const ref = new Date();
    ref.setHours(0, 0, 0, 0);
    const isInvalid = v == null || isNaN(date.getDate()) || date.getTime() > ref.getTime();
    evt.target.setValidity(!isInvalid);
}

/**
 * @param {Event} evt 
 */
export function onBlurChildrenNumber(evt) {
    const v = evt.target.value;
    const n = Number(v);
    evt.target.setValidity(v != null && !isNaN(n) && n >= 0);
}

/**
 * @param {Event} evt 
 */
export function onBlurPhone(evt) {
    let v = evt.target.value;
    // já temos um telefone válido, esse não precisa
    if ((v == null || v.length == 0) && v2 != null && v2.length > 0) {
        evt.target.setPristine();
    }
    else {
        v = v.replace(/\D/ig, '');
        evt.target.setValidity(!(v == null || v.length < 10 || v.length > 11));
    }
}

const MAIL_REGEX = /^[a-z](\w*([-\.]\w)?)+(\+[\w]+)?@([\w-]+\.)+[\w-]{2,4}$/gi;
/**
 * @param {Event} evt 
 */
export function onBlurEmail(evt) {
    const v = evt.target.value;
    const isInvalid = v == null || !MAIL_REGEX.test(v);
    evt.target.setValidity(!isInvalid);
}

/**
 * @param {Event} evt 
 */
export function onBlurCEP(evt) {
    const v = evt.target.value?.replace(/\D/ig, '');
    let isInvalid = v == null || v.length != 8;
    console.log(isInvalid);
    if (!isInvalid) {
        getAddresCep(v)
            .then(address => {
                evt.target.setValidity(address != null);
                if (address) {
                    $("#uf")
                        .setValue(address.uf)
                        .setAttribute('disabled', true);
                    $("#city")
                        .setValue(address.cidade)
                        .setAttribute('disabled', true);

                    $("#neighborhood").setValue(address.bairro);
                    if (address.bairro?.length > 0)
                        $("#neighborhood").setAttribute('disabled', true);
                    else
                        $("#neighborhood").removeAttribute('disabled');

                    $("#street").setValue(address.logradouro);
                    if (address.logradouro?.length > 0)
                        $("#street").setAttribute('disabled', true);
                    else
                        $("#street").removeAttribute('disabled');

                    if (address.complemento?.length > 0)
                        $("#complement").setValue(address.complemento);
                }

            }).catch(console.log);
    }
    else {
        evt.target.setInvalid();
    }
}

/**
 * @param {Event} evt 
 */
export function onBlurState(evt) {
    const v = evt.target.value;
    const isValid = [
        'AC', 'AL', 'AM', 'AP', 'BA',
        'CE', 'DF', 'ES', 'GO', 'MA',
        'MG', 'MS', 'MT', 'PA', 'PB',
        'PE', 'PI', 'PR', 'RJ', 'RO',
        'RR', 'RN', 'RS', 'SC', 'SE',
        'SP', 'TO',
    ].find(uf => uf == v) != undefined;
    evt.target.setValidity(isValid);
}

/**
 * @param {Event} evt 
 */
export function onBlurCity(evt) {
    const v = evt.target.value;
    const isInvalid = v == null || v.length < 3 || v.length > 50;
    evt.target.setValidity(!isInvalid);
}

/**
 * @param {Event} evt 
 */
export function onBlurStreet(evt) {
    const v = evt.target.value?.replace(/[\W ]/ig);
    const isInvalid = v == null || v.length < 3 || v.length > 50;
    evt.target.setValidity(!isInvalid);
}

/**
 * @param {Event} evt 
 */
export function onBlurNeighborhood(evt) {
    const v = evt.target.value;
    const isInvalid = v == null || v.length < 3 || v.length > 50;
    evt.target.setValidity(!isInvalid);
}

/**
 * @param {Event} evt 
 */
export function onBlurNumber(evt) {
    const v = evt.target.value?.replace(/[\W ]/ig, '');
    evt.target.setValidity(v != null && v.length > 0);
}

/**
 * 
 * @param {Event} evt 
 */
export function onCpfChange(evt) {
    /**@type {string} */
    let v = evt.target.value;
    if (v != null) {
        let pos = evt.target.selectionStart;
        if (v.length > 14) {
            v = v.substring(0, pos - 1) + v.substring(pos);
            evt.target.value = v;
            const newPos = pos - 1;
            evt.target.setSelectionRange(newPos, newPos);
        }
        else {
            // limpa a mascara
            let clear = v.replace(/\D/ig, '');
            // has at least 3 digits
            if (clear.length > 3) {
                clear = clear.replace(/(\d{3})(.+)/, '$1.$2');

            }
            // has at least 7 digits + mask characeteres
            if (clear.length > 7) {
                clear = clear.replace(/(.{7})(.+)/, '$1.$2');
            }
            // has at least 10 digits + mask characeteres
            if (clear.length > 11) {
                clear = clear.replace(/(.{11})(.{1,2}).*/, '$1-$2');
            }

            evt.target.value = clear;
            if ([4, 8, 12].find(p => p == pos))
                pos++;
            evt.target.setSelectionRange(pos, pos);
        }
    }
}

/**
 * 
 * @param {Event} evt 
 */
export function onPhoneChange(evt) {
    /**@type {string} */
    let v = evt.target.value;
    if (v != null) {
        let pos = evt.target.selectionStart;
        if (v.length > 15) {
            v = v.substring(0, pos - 1) + v.substring(pos);
            evt.target.value = v;
            const newPos = pos - 1;
            evt.target.setSelectionRange(newPos, newPos);
        }
        else {
            // limpa a mascara
            let clear = v.replace(/\D/ig, '');
            if (clear.length > 10) {
                clear = clear.replace(/(\d{2})(\d)(\d{4})(\d{4})/ig, '($1) $2 $3-$4');
                if (pos == 7 || pos == 5)
                    pos++;
            }
            else if (clear.length > 6) {
                clear = clear.replace(/(\d{2})(\d{4})(\d{1,4})/ig, '($1) $2-$3');
            }
            else if (clear.length > 5) {
                clear = clear.replace(/(\d{2})(\d{4})/ig, '($1) $2');
            }
            else if (clear.length > 2) {
                clear = clear.replace(/(.{2})(.+)/ig, '($1) $2');
            }
            else if (clear.length > 0) {
                clear = clear.replace(/(\d{1,2})/ig, '($1')
            }
            evt.target.value = clear;
            if ([1, 10].find(p => p == pos))
                pos++;
            if (pos == 4 || pos == 15) {
                pos += 2;
            }
            evt.target.setSelectionRange(pos, pos);
        }
    }
}
/**
 * 
 * @param {Event} evt 
 */
export function onCEPChange(evt) {
    /**@type {string} */
    let v = evt.target.value;
    if (v != null) {
        let pos = evt.target.selectionStart;
        if (v.length > 10) {
            v = v.substring(0, pos - 1) + v.substring(pos);
            evt.target.value = v;
            const newPos = pos - 1;
            evt.target.setSelectionRange(newPos, newPos);
        }
        else {
            // limpa a mascara
            let clear = v.replace(/\D/ig, '');

            if (clear.length > 2) {
                clear = clear.replace(/(.{2})(.+)/ig, '$1.$2');
            }
            if (clear.length > 6) {
                clear = clear.replace(/(.{6})(\d*)/ig, '$1-$2');
            }

            evt.target.value = clear;
            if ([3, 7].find(p => p == pos))
                pos++;

            evt.target.setSelectionRange(pos, pos);
            evt.target.blur();
            evt.target.focus();
        }
    }
}
/**
 * 
 * @param {Event} evt 
 */
export function clearNonDigit(evt) {
    const v = evt.target.value?.replace(/\D/ig, '');
    evt.target.value = v;
}
