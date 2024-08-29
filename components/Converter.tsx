'use client';
import FileInput from "@/components/FileInput";
import { useState } from "react";

export default ({ onFormat }: { onFormat: (input: string) => void }) => {
    const [ transcription, setTranscription ] = useState<string>("");

    const handleTranscription = (data: string) => {
        setTranscription(data);
    }

    const handleFormat = () => {
        onFormat(transcription);
    }

    return <>
        <div
          className="relative z-10 flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
            <FileInput onTranscription={handleTranscription}/>
        </div>
        {transcription && <div className="container flex flex-col items-center">
            <p className="mb-2 self-start">Tekst:</p>
            <textarea className="font-mono w-full h-64" onChange={(e) => setTranscription(e.target.value)} value={transcription} />
            <button className="mt-6 bg-green-600 rounded-md px-4 py-3 text-white text-xl" onClick={handleFormat}>Formatuj</button>
        </div>}
    </>;
}