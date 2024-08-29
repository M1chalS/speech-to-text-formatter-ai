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

    return <>
        {(!generatedOutput && !loading) && <Converter onFormat={startFormatting}/>}
            {generatedOutput && <div>
                <ReactMarkdown>{generatedOutput}</ReactMarkdown>
            </div>}
    </>;
}