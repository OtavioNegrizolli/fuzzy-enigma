/**
 * @type {function(string):Element}
 */
const $ = document.querySelector.bind(document);
/**
 * 
 * @param {string} cpf 
 * @returns {boolean} true se é valido e falso caso contrário
 */
export function validarCPF(cpf) {
    if (cpf == null)
        return false;
    cpf = cpf.replace(/\D/ig, '');
    if (cpf.length != 11)
        return false;
    // coverte para numeros
    const cpfDigits = cpf.split('').map(c => Number(c));

    // virificando pelos falsos positivos conhecidos
    if (cpfDigits.every(d => d == cpfDigits[0]))
        return false;

    let sum = 0;
    for (let i = 0; i < 9; i++)
        sum += (10 - i) * cpfDigits[i];

    sum %= 11;
    const firstDigit = 11 - (sum > 2 ? sum : 11);
    if (firstDigit != cpfDigits[9])
        return false;

    sum = 0;
    for (let i = 0; i < 10; i++)
        sum += (11 - i) * cpfDigits[i];

    sum %= 11;
    const secondDigit = 11 - (sum > 2 ? sum : 11);

    return cpfDigits[10] == secondDigit;
}

/** 
 * @param {string} cep o cep limpo sem caracteres especiais
 * @returns {Promise<{ uf:string, cidade:string, bairro:string, logradouro: string, complemento: string}>|Promise<null>}
 */
export async function getAddresCep(cep) {
    try {
        const res = await fetch(new URL(`ws/${cep}/json/`, 'https://viacep.com.br'));
        const { uf, localidade, bairro, logradouro, complemento, ...data } = await res.json();
        if (!data.erro) {
            return {
                uf,
                cidade: localidade,
                bairro,
                logradouro,
                complemento
            };
        }
    }
    catch (e) {
        console.error('Erro fetching CEP data', e);
    }
    return null;
}

$('#profilepng').onClick(() => {
    document.getElementById('profileImg').click();
});
$('#profileImg').onChange((evt) => {
    let tgt = evt.target || window.event.srcElement,
        files = tgt.files;

    // FileReader support
    if (FileReader && files && files.length) {
        const img = document.getElementById("profilepng");
        let fr = new FileReader();
        if (img.src != files[0]) {
            fr.onload = function () {
                img.src = fr.result;
            }
            console.log('triggered');
            fr.readAsDataURL(files[0]);
        }
    }
    // Not supported
    else {
        // fallback -- perhaps submit the input to an iframe and temporarily store
        // them on the server until the user's session ends.
    }
});
$("#showpwd").onClick((evt) => {
    const input = $('#password');
    input.type = input.type == "text" ? "password" : "text";
    evt.target.classList.toggle('fa-eye');
    evt.target.classList.toggle('fa-eye-slash');
});
$("#showconfirm").onClick((evt) => {
    const input = $('#confirmpassword');
    input.type = input.type == "text" ? "password" : "text";
    evt.target.classList.toggle('fa-eye');
    evt.target.classList.toggle('fa-eye-slash');
});
