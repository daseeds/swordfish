export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
}

export const getUserLocale = () => {

    const userLocale = navigator.language || navigator.userLanguage;
    if (userLocale) {
        return userLocale.slice(0, 2);
    }
    return null;
}