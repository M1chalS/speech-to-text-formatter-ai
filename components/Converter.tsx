'use client';
import FileInput from "@/components/FileInput";
import { useState } from "react";
import { getLang } from "@/lang/lang";
const langFile = require(`@/lang/${getLang()}.js`).default;

export default ({onFormat}: { onFormat: (input: string) => void }) => {
    const [ transcription, setTranscription ] = useState<string>("");
    const [ visible, setVisible ] = useState<boolean>(true);

    const handleTranscription = (data: string) => {
        setVisible(false);
        setTranscription(data);
    };

    const handleFormat = () => {
        onFormat(transcription);
    };

    return <>
        {visible && <div className="grid place-items-center"><div
          className="relative z-10 flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
            <FileInput onTranscription={handleTranscription}/>
        </div></div>}
        {!visible && <div className="w-full mb-12 md:px-16 container mx-auto">
            <p className="mb-2 self-start text-xl">{langFile.text}:</p>
            <textarea className="bg-white border-black border w-full h-64 dark:text-black dark:bg-gray-300 p-4 rounded-md"
                      onChange={(e) => setTranscription(e.target.value)} value={transcription}/>
            <div className="grid place-items-center">
                <button className="mt-6 bg-green-600 rounded-md px-4 py-3 text-white text-xl"
                        onClick={handleFormat}>{langFile.format}
                </button>
            </div>
        </div>}
    </>;
}