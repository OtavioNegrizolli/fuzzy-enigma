/**
 * @type {function(string):Element}
 */
const $ = document.querySelector.bind(document);
/**
 * @param {function(Event)} callback 
 * @returns {Element}
 */
Element.prototype.onBlur = function (callback) {
    this.addEventListener('blur', callback);
    return this;
}
/**
 * @param {function(Event)} callback 
 * @returns {Element}
 */
Element.prototype.onClick = function (callback) {
    this.addEventListener('click', callback);
    return this;
}
/**
 * @param {function(Event)} callback 
 * @returns {Element}
 */
Element.prototype.onChange = function (callback) {
    this.addEventListener('change', callback);
    return this;
}
/**
 * @param {function(Event)} callback 
 * @returns {Element}
 */
Element.prototype.onInput = function (callback) {
    this.addEventListener('input', callback);
    return this;
}
/**
 * @param {function(Event)} callback 
 * @returns {Element}
 */
Element.prototype.setInvalid = function () {
    this.classList.remove('valid');
    this.classList.add('invalid');
    return this;
}
/**
 * @param {function(Event)} callback 
 * @returns {Element}
 */
Element.prototype.setValid = function () {
    this.classList.remove('invalid');
    this.classList.add('valid');
    return this;
}
/**
 * @param {function(Event)} callback 
 * @returns {Element}
 */
Element.prototype.setPristine = function () {
    this.classList.remove('invalid');
    this.classList.remove('valid');
    return this;
}
/**
 * @param {function(Event)} callback 
 * @returns {Element}
 */
Element.prototype.setValidity = function (shouldBeValid) {
    if (shouldBeValid) 
        this.setValid();
    else if (shouldBeValid != null) 
        this.setInvalid();
    else 
        this.setPristine();
    return this;
}
/**
 * @param {any} callback 
 * @returns {Element}
 */
Element.prototype.setValue = function (value) {
    this.value = value;
    return this;
}
