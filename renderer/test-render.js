const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

const outputPath = path.join(__dirname, 'renders', 'test-pin.png');
const sample = {
  productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=85',
  headline: 'Everyday Style, Perfected',
  subtitle: 'A timeless essential designed for your daily routine.',
  benefit1: 'Premium materials',
  benefit2: 'Comfortable all day',
  benefit3: 'Made to last',
  cta: 'Shop Now',
  brand: 'Nexcart',
  price: '$19.99'
};

async function main() {
  if (!process.env.RENDERER_API_KEY) {
    throw new Error('RENDERER_API_KEY is missing in renderer/.env');
  }

  const response = await fetch('http://localhost:3000/render', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.RENDERER_API_KEY
    },
    body: JSON.stringify(sample)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Render request failed (${response.status}): ${errorBody}`);
  }

  const image = Buffer.from(await response.arrayBuffer());
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, image);
  console.log(`Saved test render: ${outputPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
