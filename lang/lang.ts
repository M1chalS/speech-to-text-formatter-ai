export const getLang = () => {
    if (typeof window !== 'undefined') {
        return localStorage?.getItem("language") || "pl";
    } else {
        return "pl";
    }
}

export const setLang = (lang: string) => {
    if (typeof window !== 'undefined') {
        localStorage?.setItem("language", lang);
    }
}