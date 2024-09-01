'use client';
import Converter from "@/components/Converter";
import ReactMarkdown from 'react-markdown';
import { useState } from "react";
import { getLang } from "@/lang/lang";
import ProgressIndicator from "@/components/ProgressIndicator";

const langFile = require(`@/lang/${getLang()}.js`).default;

export default () => {
    const [ generatedOutput, setGeneratedOutput ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);

    const startFormatting = async (input: string) => {
        setLoading(true);

        if ( !input ) {
            setLoading(false);
            return;
        }

        const response = await fetch("/api/format", {
            method: "POST",
            body: JSON.stringify({text: input}),
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": getLang(),
            },
        });

        const data = await response.json();

        setLoading(false);
        setGeneratedOutput(data.result);
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(generatedOutput);
    };

    return <div className="grid items-center w-full h-full">
        <div className="lg:mb-0 mb-32">
            {loading && <ProgressIndicator/>}
            {(!generatedOutput && !loading) && <Converter onFormat={startFormatting}/>}
            {generatedOutput && <div className="px-4">
                <div className="flex flex-row justify-between gap-x-8 items-center mb-4">
                    <h2 className="text-2xl mb-4">{langFile.result}</h2>
                    <button onClick={copyToClipboard}
                            className="bg-gray-100 text-blue-600 border-blue-600 border md:text-base text-sm rounded-xl md:py-2 py-0.5 md:px-3 px-1">Kopiuj
                        tekst w formacie markdown
                    </button>
                </div>
                <div className="p-4 bg-white border-black border w-full font-mono rounded-lg dark:text-black dark:bg-gray-300">
                    <ReactMarkdown>{generatedOutput}</ReactMarkdown>
                </div>
            </div>}
        </div>
    </div>;
}