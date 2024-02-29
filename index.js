const readline = require('readline');
const qr = require('qrcode');
const axios = require('axios').default;
const { execSync } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to parse URL and extract its components
function parseURL(urlString) {
    try {
        const url = new URL(urlString);
        return {
            protocol: url.protocol,
            hostname: url.hostname,
            port: url.port,
            path: url.pathname,
            queryParams: Object.fromEntries(url.searchParams.entries()),
            fragment: url.hash.slice(1)
        };
    } catch (err) {
        console.error('Error parsing URL:', err);
        return null;
    }
}

// Function to generate QR code for a given URL
async function generateQRCode(url, filename) {
    try {
        await qr.toFile(filename, url);
        console.log('QR code generated successfully:', filename);
        return filename;
    } catch (err) {
        console.error('Error generating QR code:', err);
        return null;
    }
}

// Function to generate short URL using TinyURL API
async function generateShortUrl(url) {
    try {
        const response = await axios.post('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url));
        const shortUrl = response.data;
        console.log('Short URL generated successfully:', shortUrl);
        return shortUrl;
    } catch (err) {
        console.error('Error generating short URL:', err);
        return null;
    }
}

// Function to copy text to clipboard using execSync
function copyToClipboard(text) {
    try {
        execSync(`echo ${text} | clip`);
        console.log('Text copied to clipboard:', text);
        return true;
    } catch (err) {
        console.error('Error copying text to clipboard:', err);
        return false;
    }
}

// Function to prompt user for URL input
function promptForURL(action) {
    rl.question(`Enter website URL to ${action}: `, async (answer) => {
        const websiteUrl = answer.trim();

        if (action === 'generate QR code') {
            // Generate QR code
            const qrCodeFilename = await generateQRCode(websiteUrl, 'qrcode.png');
            if (qrCodeFilename) {
                console.log('Process completed successfully.');
            } else {
                console.log('Error generating QR code.');
            }
        } else if (action === 'shorten URL') {
            // Generate short URL
            const shortUrl = await generateShortUrl(websiteUrl);
            // Copy short URL to clipboard
            const isCopied = shortUrl ? copyToClipboard(shortUrl) : false;
            if (shortUrl && isCopied) {
                console.log('Process completed successfully.');
            } else {
                console.log('Error occurred during processing.');
            }
        } else if (action === 'parse URL') {
            // Parse the URL
            const parsedURL = parseURL(websiteUrl);
            if (parsedURL) {
                console.log('Parsed URL:', parsedURL);
                console.log('Process completed successfully.');
            } else {
                console.log('Error parsing URL.');
            }
        }

        rl.close();
    });
}

// Start the CLI
function startCLI() {
    rl.question('Choose an action (generate QR code, shorten URL, parse URL): ', (action) => {
        const validActions = ['generate QR code', 'shorten URL', 'parse URL'];
        if (!validActions.includes(action)) {
            console.log('Invalid action. Please choose from generate QR code, shorten URL, or parse URL.');
            startCLI();
            return;
        }

        promptForURL(action);
    });
}

startCLI();
module.exports = { promptForURL };