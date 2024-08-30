'use client';

import { useState } from "react";
import { getLang, setLang } from "@/lang/lang";

export default () => {
    const [ language, setLanguage ] = useState(getLang());

    const handleSelectLanguage = () => {
        if(language === "pl") {
            if(!confirm("Czy na pewno chcesz zmienić język na angielski? Zmiana języka spowoduje restart aplikacji."))
                return;
        } else {
            if(!confirm("Are you sure you want to change the language to Polish? Changing the language will restart the application."))
                return;
        }

        setLanguage(language === "pl" ? "en" : "pl");

        setLang(language === "pl" ? "en" : "pl");

        window.location.reload();
    }

    return (
        <div className="fixed top-2 right-2">
            <select value={language} onChange={handleSelectLanguage}>
                <option value="pl">PL</option>
                <option value="en">EN</option>
            </select>
        </div>
    )
}