'use client';
import Converter from "@/components/Converter";
import ReactMarkdown from 'react-markdown';
import { useState } from "react";

export default () => {
    const [ generatedOutput, setGeneratedOutput ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);

    const startFormatting = async (input: string) => {
        setLoading(true);

        const response = await fetch("/api/format", {
            method: "POST",
            body: JSON.stringify({text: input}),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        setGeneratedOutput(data.result);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedOutput);
    }

    return <>
        {(!generatedOutput && !loading) && <Converter onFormat={startFormatting}/>}
        {generatedOutput && <div className="container">
            <div className="flex flex-row justify-between items-center mb-4">
                <h2 className="text-2xl mb-4">Wynik</h2>
                <button onClick={copyToClipboard} className="bg-gray-100 text-black border-black border rounded-xl py-2 px-3">Kopiuj tekst w formacie markdown</button>
            </div>
            <code>
                <ReactMarkdown>{generatedOutput}</ReactMarkdown>
            </code>
        </div>}
    </>;
}