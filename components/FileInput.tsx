'use client';
import { ChangeEvent, useState } from "react";
import toWav from "audiobuffer-to-wav";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default ({onTranscription}: { onTranscription: (data: string) => void }) => {
    const [ file, setFile ] = useState<File | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if ( e.target.files ) {
            setFile(e.target.files[0]);
        }
    };

    const handleConvert = async () => {
        setLoading(true);

        const audioContext = new AudioContext();
        const buf = await file?.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(buf as ArrayBuffer);
        const wav = toWav(audioBuffer);

        const response = await fetch("/api/convert", {
            method: "POST",
            body: wav,
            headers: {
                "Content-Type": "file/*",
            },
        });

        const data = await response.json();

        setLoading(false);

        onTranscription(data.result);
    };

    return <div className="container z-10 flex flex-row justify-between items-center gap-12 md:mt-0 mt-12">
        {loading && <div className="fixed inset-0 w-screen h-screen grid place-items-center z-20 bg-gray-300/20">
            <CircularProgressbar value={50} text={`${50}%`} className="w-64 h-64"/>
        </div>}
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-y-0 gap-y-12  place-items-center">
            <div className="flex flex-col md:gap-y-4 gap-y-2">
                <div className="place-self-start">Wybierz plik dźwiękowy</div>
                <label className="block">
                    <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500 pointer-events-auto
                            file:me-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-600 file:text-white
                            hover:file:bg-blue-700
                            file:disabled:opacity-50 file:disabled:pointer-events-none
                            dark:text-neutral-500
                            dark:file:bg-blue-500
                            dark:hover:file:bg-blue-400
                          "
                           accept={"audio/*"}
                    />
                </label>
                <button onClick={handleConvert} disabled={loading}
                        className="mt-12 bg-green-600 rounded-md px-3 py-2 text-white self-center">
                    Rozpocznij konwersję
                </button>
            </div>
            <div>
                <div/>
                <div className="text-2xl">Lub</div>
                <div/>
            </div>
            <div className="flex flex-col md:gap-y-4 gap-y-1 items-center">
                <div className="place-self-start">Wpisz tekst ręcznie</div>
                <button className="mt-12 bg-green-600 rounded-md px-3 py-2 text-white"
                        onClick={() => onTranscription("")}>Przejdź do edytora
                </button>
                <div/>
            </div>
        </div>
    </div>;
}