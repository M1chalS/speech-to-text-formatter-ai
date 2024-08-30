'use client';
import { CircularProgressbar } from "react-circular-progressbar";
import { useEffect, useState } from "react";

export default () => {
    const [ progress, setProgress ] = useState<number>(10);

    useEffect(() => {
        setTimeout(() => setProgress(20), 1000);
        setTimeout(() => setProgress(30), 1500);
        setTimeout(() => setProgress(70), 3000);
        setTimeout(() => setProgress(90), 4000);
    }, []);

    return <div className="fixed inset-0 w-screen h-screen grid place-items-center z-20 bg-gray-300/20">
        <CircularProgressbar value={progress} text={`${progress}%`} className="w-64 h-64"/>
    </div>;
}