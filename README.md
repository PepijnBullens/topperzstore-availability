## Introduction

This project is a web application that allows me to easily keep track of whether my favorite clothing items on topperzstore.nl are back in stock in my size. The application is built with Next.js, uses JSDOM to scrape web pages, and stores the collected data in a Prisma database.

Background
The Topperzstore website is slow, and most popular items are often sold out. Manually checking each product took a lot of time and caused frustration. That's why I developed my own system where I can save URLs of favorite products and, with the click of a button, check if my size is back in stock.

Features
- URL management via a simple CMS, secured with NextAuth.
- Scraper using JSDOM that analyzes the selected product pages when I click “check.”
- Prisma database for storing product information.
- A clean frontend where I can quickly see if my size is available — without having to open the slow webshop.

## Run for local development

Development server:

```bash
npm install
# or
bun install
```

```bash
npm run dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
