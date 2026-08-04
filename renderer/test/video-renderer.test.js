const test = require('node:test');
const assert = require('node:assert/strict');
const { validateVideoRenderPayload } = require('../video-renderer');

test('accepts a valid video render payload', () => {
  const payload = {
    format: 'mp4',
    platform: 'tiktok',
    width: 1080,
    height: 1920,
    duration: 15,
    fps: 30,
    product_title: 'Starter bundle',
    hook: 'This changes everything',
    script: 'Show the product in action',
    caption: 'Grab yours today',
    cta: 'Shop now',
    image_url: 'https://example.com/product.png',
    product_url: 'https://example.com/product'
  };

  const result = validateVideoRenderPayload(payload);
  assert.equal(result.width, 1080);
  assert.equal(result.height, 1920);
  assert.equal(result.duration, 15);
  assert.equal(result.fps, 30);
  assert.equal(result.platform, 'tiktok');
});

test('accepts lightweight test mode dimensions', () => {
  const result = validateVideoRenderPayload({ test_mode: true, product_title: 'Demo launch', width: 720, height: 1280, duration: 3, fps: 12 });
  assert.equal(result.width, 720);
  assert.equal(result.height, 1280);
  assert.equal(result.duration, 3);
  assert.equal(result.fps, 12);
});

test('uses cinematic defaults for a premium SaaS commercial prompt', () => {
  const payload = {
    product_title: 'Canvas AI',
    prompt: 'Premium SaaS commercial. A clean modern creative workspace. A designer effortlessly builds an automation workflow with colorful nodes connecting smoothly.',
    platform: 'pinterest',
    image_url: 'https://example.com/product.png'
  };

  const result = validateVideoRenderPayload(payload);
  assert.equal(result.creative_prompt, payload.prompt);
  assert.equal(result.product_title, payload.product_title);
  assert.equal(result.platform, 'pinterest');
  assert.equal(result.duration, 30);
  assert.equal(result.fps, 24);
});

test('normalizes artifact-avoidance guidance from a negative prompt', () => {
  const payload = {
    product_title: 'Canvas AI',
    negative_prompt: 'Avoid text distortion, extra fingers, floating objects, UI glitches, warped screens, duplicate hands, low quality, noise, compression artifacts, cheap animation, blurry interface, camera shake, oversaturation, unnatural movement, flickering, incorrect reflections.',
    image_url: 'https://example.com/product.png'
  };

  const result = validateVideoRenderPayload(payload);
  assert.equal(result.negative_prompt, payload.negative_prompt);
  assert.ok(result.avoid_list.includes('text distortion'));
  assert.ok(result.avoid_list.includes('ui glitches'));
  assert.ok(result.avoid_list.includes('incorrect reflections'));
});

test('normalizes emotional tone cues for premium software feeling', () => {
  const payload = {
    product_title: 'Canvas AI',
    feeling: 'Confidence. Innovation. Speed. Premium quality. Trust. Luxury software.',
    image_url: 'https://example.com/product.png'
  };

  const result = validateVideoRenderPayload(payload);
  assert.equal(result.emotion_summary, 'Confidence • Innovation • Speed • Premium quality • Trust • Luxury software');
  assert.equal(result.emotion_profile.confidence, true);
  assert.equal(result.emotion_profile.innovation, true);
  assert.equal(result.emotion_profile.speed, true);
  assert.equal(result.emotion_profile.premium_quality, true);
  assert.equal(result.emotion_profile.trust, true);
  assert.equal(result.emotion_profile.luxury_software, true);
});

test('normalizes soundtrack and inspirational ending cues', () => {
  const payload = {
    product_title: 'Canvas AI',
    soundtrack: 'Energetic cinematic electronic soundtrack. Subtle risers. Modern bass. Inspirational ending.',
    image_url: 'https://example.com/product.png'
  };

  const result = validateVideoRenderPayload(payload);
  assert.equal(result.soundtrack_profile.energetic, true);
  assert.equal(result.soundtrack_profile.cinematic, true);
  assert.equal(result.soundtrack_profile.electronic, true);
  assert.equal(result.soundtrack_profile.subtle_risers, true);
  assert.equal(result.soundtrack_profile.modern_bass, true);
  assert.equal(result.soundtrack_profile.inspirational_ending, true);
  assert.match(result.soundtrack_summary, /Energetic/);
});

test('rejects unsupported formats or invalid dimensions', () => {
  assert.throws(() => validateVideoRenderPayload({ format: 'gif', product_title: 'Demo' }), /Unsupported format/);
  assert.throws(() => validateVideoRenderPayload({ product_title: 'Demo', width: 5000, height: 1920 }), /sensible positive integers/);
  assert.throws(() => validateVideoRenderPayload({ product_title: 'Demo', width: 1080, height: 1920, duration: 0 }), /duration/);
});
