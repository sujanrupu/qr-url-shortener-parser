# QR URL Short Parser

## NPM package link: https://www.npmjs.com/package/qr-url-shortener-parser?activeTab=readme
 
QR URL Short Parser is a versatile npm package that provides functionalities for generating QR codes, shortening URLs, and parsing URLs. It's a comprehensive tool designed to simplify the management of URLs in various applications.

## Features

- **QR Code Generation:** Easily generate QR codes for any URL.
- **URL Shortening:** Shorten long URLs using popular URL shortening services.
- **URL Parsing:** Parse and extract components from URLs for further processing.

## Installation

You can install QR URL Short Parser via npm:

## Use:
```
const { promptForURL } = require('qr-url-shortener-parser');

// Now you can use the generateQRCode function in your code
(async () => {
    const qrCodeFilename = await promptForURL('', 'qrcode.png');
    
})();

```
