const fs = require('fs');
const path = require('path');
const https = require('https');

/*
extract download links from page using 

url : https://zolostays.com/dashboard/transactions

const links = Array.from(document.querySelectorAll('a'))
  .filter(a => a.textContent.trim().includes('Download Receipt'))
  .map(a => a.href);

console.log(links);
*/

const links = [
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-darren/2025/september/67e8e37015a724000160bbe7_REZODARN202597.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-darren/2025/august/67e8e37015a724000160bbe7_REZODARN2025865.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-darren/2025/july/67e8e37015a724000160bbe7_REZODARN2025779.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-darren/2025/july/67e8e37015a724000160bbe7_REZODARN2025723.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-darren/2025/june/67e8e37015a724000160bbe7_REZODARN2025632.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-darren/2025/may/67e8e37015a724000160bbe7_REZODARN20255133.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-darren/2025/may/67e8e37015a724000160bbe7_REZODARN2025512.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-darren/2025/april/67e8e37015a724000160bbe7_REZODARN2025418.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-darren/2025/march/67e8e37015a724000160bbe7_REZODARN20253241.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-darren/2025/march/62666743e7014f00010e75f8_REZODARN20253240.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-darren/2025/march/62666743e7014f00010e75f8_REZODARN20253238.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-darren/2025/march/62666743e7014f00010e75f8_REZODARN20253235.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-aikin/2025/march/66e6b7271f5a6200012b9376_REZOIKIN202538.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-aikin/2025/january/66e6b7271f5a6200012b9376_REZOIKIN20251111.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-aikin/2025/january/66e6b7271f5a6200012b9376_REZOIKIN2025119.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-aikin/2024/december/66e6b7271f5a6200012b9376_REZOIKIN2024125.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-aikin/2024/november/66e6b7271f5a6200012b9376_REZOIKIN2024116.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-aikin/2024/october/66e6b7271f5a6200012b9376_REZOIKIN20241013.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-aikin/2024/september/66e6b7271f5a6200012b9376_REZOIKIN2024938.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-aikin/2024/september/66e6b7271f5a6200012b9376_REZOIKIN2024937.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-aikin/2024/september/62666743e7014f00010e75f8_REZOIKIN2024936.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-aikin/2024/september/62666743e7014f00010e75f8_REZOIKIN2024925.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-leela/2024/september/6663e2ede0738900012663a7_REZOLOLL2024922.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-leela/2024/august/6663e2ede0738900012663a7_REZOLOLL20248135.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-leela/2024/july/6663e2ede0738900012663a7_REZOLOLL20247200.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-leela/2024/july/6663e2ede0738900012663a7_REZOLOLL2024715.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-leela/2024/june/6663e2ede0738900012663a7_REZOLOLL20246144.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-leela/2024/june/6663e2ede0738900012663a7_REZOLOLL20246137.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-leela/2024/june/62666743e7014f00010e75f8_REZOLOLL20246136.pdf",
  "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/reciepts/tenant_reciepts/bangalore/zolo-leela/2024/june/62666743e7014f00010e75f8_REZOLOLL20246121.pdf"
];

const downloadDir = './pdfs';

if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

function downloadFile(url, index) {
  return new Promise((resolve, reject) => {
    const urlPath = new URL(url).pathname;
    const pathParts = urlPath.split('/');

    const location = pathParts[pathParts.indexOf('bangalore') + 1];
    const year = pathParts[pathParts.indexOf('bangalore') + 2];
    const month = pathParts[pathParts.indexOf('bangalore') + 3];

    const filename = `${location}-${year}-${month}.pdf`;
    const filepath = path.join(downloadDir, filename);

    if (fs.existsSync(filepath)) {
      console.log(`${index + 1}/${links.length}: ${filename} already exists, skipping`);
      resolve();
      return;
    }

    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`${index + 1}/${links.length}: Downloaded ${filename}`);
          resolve();
        });
      } else {
        file.close();
        fs.unlink(filepath, () => {});
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadAllPDFs() {
  console.log(`Starting download of ${links.length} PDFs...`);
  console.log(`Download directory: ${path.resolve(downloadDir)}`);

  const concurrency = 5;
  const results = [];

  for (let i = 0; i < links.length; i += concurrency) {
    const batch = links.slice(i, i + concurrency);
    const batchPromises = batch.map((link, batchIndex) =>
      downloadFile(link, i + batchIndex).catch(err => {
        console.error(`Error downloading: ${err.message}`);
        return null;
      })
    );

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }

  const successful = results.filter(r => r !== null).length;
  const failed = results.length - successful;

  console.log(`\nDownload completed!`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);
  console.log(`Files saved to: ${path.resolve(downloadDir)}`);
}

downloadAllPDFs().catch(console.error);