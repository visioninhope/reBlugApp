// utils/superagi.js

import { Client } from 'superagi_client';

const client = new Client({
    apiKey: process.env.SUPER_AGI_KEY,
});

export default client;
