'use client';
import { ChangeEvent, FormEvent, useState } from "react";
import toWav from "audiobuffer-to-wav";

export default ({onTranscription}: { onTranscription: (data: string) => void }) => {
    const [ file, setFile ] = useState<File | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ visible, setVisible ] = useState<boolean>(true);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if ( e.target.files ) {
            setFile(e.target.files[0]);
        }
    };

    const handleConvert = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
        setVisible(false);

        onTranscription(data.result);
    };

    return <div className="max-w-sm z-10">
        {visible && <form onSubmit={handleConvert} className="flex flex-col items-center">
            <label className="block">
                <span className="sr-only">Wybierz plik dźwiękowy</span>
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
                          "/>
            </label>
            <button type="submit" disabled={loading} className="mt-12 bg-green-600 rounded-md px-3 py-2 text-white">
                Rozpocznij konwersję
            </button>
        </form>}
    </div>;
}