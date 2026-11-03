import assert from 'node:assert/strict';
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';

// Import the complete app, including shared data initialized before React mounts.
// A production build alone cannot detect exceptions in module initialization.
const server = await createServer({
  configFile: false,
  cacheDir: 'node_modules/.vite-startup-check',
  plugins: [react()],
  server: { middlewareMode: true },
  appType: 'custom',
  optimizeDeps: { noDiscovery: true, include: [] },
});

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  assert.equal(typeof App, 'function');
  const { qaMapping } = await server.ssrLoadModule('/src/data/chatbotData.js');
  const response = qaMapping.find(item => item.keywords.includes('experience')).answer;
  assert.ok(response.includes('INORIZON'));
  assert.ok(response.includes('Business Automation Ltd.'));
  assert.ok(!response.includes('undefined'));
  console.log('PASS: full app imports, current and previous experience, and optional experience fields.');
} finally {
  await server.close();
}
