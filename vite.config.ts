import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

const DEV_PRICES = {
  turkey: {
    starter: { id: 'starter', name: 'STARTER', totalPrice: 6320, initialPayment: 3160, remainingPayment: 3160, currency: 'TRY' },
    business: { id: 'business', name: 'BUSINESS', totalPrice: 10320, initialPayment: 5160, remainingPayment: 5160, currency: 'TRY' },
    'ai-business': { id: 'ai-business', name: 'AI BUSINESS', totalPrice: 15920, initialPayment: 7960, remainingPayment: 7960, currency: 'TRY' },
  },
  international: {
    starter: { id: 'starter', name: 'STARTER', totalPrice: 400, initialPayment: 200, remainingPayment: 200, currency: 'USD' },
    business: { id: 'business', name: 'BUSINESS', totalPrice: 640, initialPayment: 320, remainingPayment: 320, currency: 'USD' },
    'ai-business': { id: 'ai-business', name: 'AI BUSINESS', totalPrice: 1000, initialPayment: 500, remainingPayment: 500, currency: 'USD' },
  },
};

function apiDevPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost:3000'}`);

        if (url.pathname === '/api/health') {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.statusCode = 200;
          res.end(JSON.stringify({ ok: true, service: 'velnar-api' }));
          return;
        }

        if (url.pathname === '/api/payment/config') {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.statusCode = 200;
          res.end(
            JSON.stringify({
              ok: true,
              isSandbox: true,
              sandboxBadge: 'SANDBOX / TEST PAYMENT',
              prices: DEV_PRICES,
            })
          );
          return;
        }

        if (url.pathname === '/api/payment/create' && req.method === 'POST') {
          let bodyStr = '';
          req.on('data', (chunk) => {
            bodyStr += chunk;
          });
          req.on('end', () => {
            try {
              const body = JSON.parse(bodyStr || '{}');
              const { packageId, market, language, buyer } = body;
              const pkg = (DEV_PRICES as any)[market]?.[packageId];
              if (!pkg) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: false, error: 'Invalid packageId or market' }));
                return;
              }

              const randomHex = Math.floor(Math.random() * 1e12).toString(36);
              const convId = 'sandbox-' + randomHex;
              const lang = language === 'en' ? 'en' : 'tr';
              
              // In dev mode without live iyzico keys, provide the sandbox demo payment redirect
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  ok: true,
                  paymentPageUrl: `/${lang}/payment/success?ref=${convId}`,
                  conversationId: convId,
                  isSandbox: true,
                })
              );
            } catch {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
