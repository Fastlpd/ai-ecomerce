function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function optionalText(value, className) {
  const text = String(value ?? '').trim();
  return text ? `<div class="${className}">${escapeHtml(text)}</div>` : '';
}

function renderPinterestTemplate(data) {
  const brand = String(data.brand ?? '').trim();
  const headline = String(data.headline ?? '').trim();
  const productImage = String(data.productImage ?? '').trim();
  const benefits = [data.benefit1, data.benefit2, data.benefit3]
    .map((benefit) => String(benefit ?? '').trim())
    .filter(Boolean)
    .map((benefit) => `<li><span class="check">✓</span><span>${escapeHtml(benefit)}</span></li>`)
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=1000, height=1500">
  <title>${escapeHtml(headline || 'Pinterest product pin')}</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    html, body { margin: 0; width: 1000px; height: 1500px; }
    body {
      background: #f7f3ee;
      color: #17211f;
      font-family: Arial, Helvetica, sans-serif;
      overflow: hidden;
    }
    .pin {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 1000px;
      height: 1500px;
      padding: 70px 76px 64px;
      overflow: hidden;
      background: linear-gradient(145deg, #fcfaf7 0%, #f1e9e1 100%);
    }
    .accent { position: absolute; width: 430px; height: 430px; right: -130px; top: -145px; border-radius: 50%; background: #d8e5de; opacity: .78; }
    .accent-two { position: absolute; width: 260px; height: 260px; left: -125px; bottom: 175px; border-radius: 50%; background: #ead6c5; opacity: .48; }
    .content { position: relative; z-index: 1; display: flex; flex-direction: column; height: 100%; }
    .brand { min-height: 34px; color: #437365; font-size: 25px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; }
    .headline { max-width: 848px; margin-top: 50px; color: #17211f; font-size: clamp(58px, 7vw, 86px); font-weight: 800; line-height: .98; letter-spacing: -2px; overflow-wrap: anywhere; }
    .subtitle { max-width: 760px; margin-top: 25px; color: #56635f; font-size: 30px; line-height: 1.28; overflow-wrap: anywhere; }
    .product-wrap { display: flex; align-items: center; justify-content: center; height: 660px; margin: 38px 0 40px; border-radius: 34px; background: rgba(255,255,255,.65); box-shadow: 0 24px 55px rgba(63, 52, 41, .12); }
    .product { width: 88%; height: 88%; object-fit: contain; }
    .details { display: flex; align-items: flex-end; justify-content: space-between; gap: 36px; }
    .benefits { flex: 1; margin: 0; padding: 0; list-style: none; color: #34433e; font-size: 25px; line-height: 1.35; }
    .benefits li { display: flex; gap: 14px; align-items: flex-start; margin: 11px 0; overflow-wrap: anywhere; }
    .check { display: inline-flex; flex: 0 0 30px; align-items: center; justify-content: center; width: 30px; height: 30px; margin-top: 2px; border-radius: 50%; background: #437365; color: #fff; font-size: 19px; font-weight: 700; }
    .price { color: #17211f; font-size: 48px; font-weight: 800; white-space: nowrap; }
    .cta { align-self: flex-start; margin-top: auto; padding: 22px 40px; border-radius: 999px; background: #d96f4f; color: #fff; font-size: 28px; font-weight: 700; overflow-wrap: anywhere; }
  </style>
</head>
<body>
  <main class="pin">
    <div class="accent"></div><div class="accent-two"></div>
    <div class="content">
      ${optionalText(brand, 'brand')}
      <div class="headline">${escapeHtml(headline)}</div>
      ${optionalText(data.subtitle, 'subtitle')}
      <div class="product-wrap"><img class="product" src="${escapeHtml(productImage)}" alt="${escapeHtml(headline)}"></div>
      <div class="details">
        <ul class="benefits">${benefits}</ul>
        ${optionalText(data.price, 'price')}
      </div>
      ${optionalText(data.cta, 'cta')}
    </div>
  </main>
</body>
</html>`;
}

module.exports = { renderPinterestTemplate };
