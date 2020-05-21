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

export const getLinkFromPage = (page, locale, menus) => {
    return Object.keys(menus).map(menuKey => {
        if (menuKey === page)
            return menus[menuKey].link[locale];
        if (menus[menuKey].menus)
            return getLinkFromPage(page, locale, menus[menuKey].menus);
        return "";
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, "" );
}

export const getPageFromLink = (link, locale, menus) => {
    console.log("[getPageFromLink]", link, locale, menus)
    return Object.keys(menus).map(menuKey => {
        if (!menus[menuKey].menus &&  menus[menuKey].link[locale] === link)
            return menus[menuKey].page;
        if (menus[menuKey].menus) {
            return getPageFromLink(link, locale, menus[menuKey].menus);
        }
        return "";
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, "" );
}