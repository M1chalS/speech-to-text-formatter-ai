export const getLang = () => {
    return localStorage.getItem("language") || "pl";
}

export const setLang = (lang: string) => {
    localStorage.setItem("language", lang);
}