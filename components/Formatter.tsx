'use client';
import Converter from "@/components/Converter";
import ReactMarkdown from 'react-markdown';
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

export default () => {
    const [ generatedOutput, setGeneratedOutput ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);

    const startFormatting = async (input: string) => {
        setLoading(true);

        if(!input) {
            setLoading(false);
            return;
        }

        const response = await fetch("/api/format", {
            method: "POST",
            body: JSON.stringify({text: input}),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        setLoading(false);
        setGeneratedOutput(data.result);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedOutput);
    }

    return <div className="lg:mb-48 mb-32 container">
        {loading && <div className="fixed inset-0 w-screen h-screen grid place-items-center z-20 bg-gray-300/20">
            <CircularProgressbar value={50} text={`${50}%`} className="w-64 h-64"/>
        </div>}
        {(!generatedOutput && !loading) && <Converter onFormat={startFormatting}/>}
        {generatedOutput && <div className="md:container px-4">
            <div className="flex flex-row justify-between gap-x-8 items-center mb-4">
                <h2 className="text-2xl mb-4">Wynik</h2>
                <button onClick={copyToClipboard} className="bg-gray-100 text-black border-black border md:text-base text-sm rounded-xl md:py-2 py-0.5 md:px-3 px-1">Kopiuj tekst w formacie markdown</button>
            </div>
            <code>
                <ReactMarkdown>{generatedOutput}</ReactMarkdown>
            </code>
        </div>}
    </div>;
}