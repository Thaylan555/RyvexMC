# Deploy na Cloudflare Pages

1. Envie este projeto para um repositório Git.
2. Na Cloudflare Pages, conecte o repositório.
3. Use **Vite** como preset.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Node.js: 22 ou superior.

As variáveis públicas do Supabase já estão em `.env.production`. Elas são uma URL pública e uma chave publishable, nunca uma service role/secret key.

A pasta `functions/` é publicada automaticamente como Cloudflare Pages Functions. O endpoint `/api/status` consulta o servidor Java `ryvexmc.pvp.srv.br:21403` e devolve apenas os dados necessários para o site.

Depois do deploy, entre em `/staff` com a conta owner já cadastrada no Supabase e envie o banner oficial em **Visual & mídia**. O hero usa esse banner como fundo.
