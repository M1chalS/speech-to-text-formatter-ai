import { NextRequest, NextResponse } from "next/server";
import speech from "@google-cloud/speech";
import { google } from "@google-cloud/speech/build/protos/protos";
import AudioEncoding = google.cloud.speech.v1.RecognitionConfig.AudioEncoding;

const client = new speech.SpeechClient({
    projectId: process.env.GCP_PROJECT_ID,
    credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL,
        private_key: process.env.GCP_PRIVATE_KEY!.split('\\n').map(i => i + "\n").join(""),
    },
});

export async function POST(req: NextRequest) {
    const wavReadableStream = req.body as unknown as ReadableStream;

    const buf = await new Response(wavReadableStream).arrayBuffer();

    const audio = {
        content: Buffer.from(buf).toString("base64"),
    }

    const config = {
        encoding: AudioEncoding.LINEAR16,
        languageCode: "pl-PL",
    }

    const request = {
        audio: audio,
        config: config,
    }

    try {
        const [response] = await client.recognize(request);

        if(!response?.results || response?.results?.length === 0) {
            return new NextResponse(JSON.stringify({message: "No results found!"}), {
                status: 400,
            });
        }

        const transcription = response.results
          .map(result => result.alternatives![0].transcript)
          .join('\n');

        return new NextResponse(JSON.stringify({result: transcription}), {
            status: 200,
        });
    } catch (e) {
        return new NextResponse(JSON.stringify({message: e}), {
            status: 500,
        });
    }
}