import { json } from '@sveltejs/kit';
import clientPromise from '$lib/server/db';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json();
        const { userId, sessionId, transcription } = data;

        if (!userId || !transcription) {
            return json({ error: 'Missing required fields: userId, transcription' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection('transcriptions');

        const result = await collection.insertOne({
            userId,
            sessionId: sessionId || 'unknown',
            transcription,
            timestamp: new Date()
        });

        return json({ success: true, id: result.insertedId }, { status: 201 });
    } catch (e) {
        console.error('Error saving transcription:', e);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
