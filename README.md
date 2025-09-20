# Zolo Rent Receipt Downloader

A Node.js script to download rent receipt PDFs from ZoloStays dashboard.

## How to Get Download Links

1. Login to your ZoloStays account
2. Navigate to: https://zolostays.com/dashboard/transactions
3. Open browser developer console (F12)
4. Run this JavaScript code in the console:

```javascript
const links = Array.from(document.querySelectorAll("a"))
  .filter((a) => a.textContent.trim().includes("Download Receipt"))
  .map((a) => a.href);

console.log(links);
```

5. Copy the output array and replace the `links` array in `download-pdfs.js`

## How to Run

1. Run the download script:

```bash
pnpm run download
```

The script will:

- Create a `pdfs` folder if it doesn't exist
- Download all PDFs with organized filenames (location-year-month.pdf)
- Skip files that already exist
- Show progress and download status
- Download 5 files concurrently for efficiency

## Output

PDFs will be saved in the `./pdfs` directory with filenames like:

- `zolo-darren-2025-september.pdf`
- `zolo-aikin-2024-december.pdf`
- `zolo-leela-2024-june.pdf`
