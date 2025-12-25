const isValid = (input) => {
    if(typeof input === "undefined" || input === null ) return false;
    if(typeof input === "string" && input.trim().Length === 0) return false;
    if(typeof input === "number" && isNaN(input)) return false;
    return true;

};


const isValidName = (input) => /^[a-zA-Z ]*$/.test(input);

const isValidEmail = (input) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);

const isValidContact = (input) => 
    /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(input);

let isValidPassword = (input) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/.test(input);

module.exports = { isValid, isValidName, isValidEmail, isValidContact, isValidPassword };