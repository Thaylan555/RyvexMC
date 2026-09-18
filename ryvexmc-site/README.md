# RyvexMC — Site oficial

Frontend em React + Vite pronto para Cloudflare Pages, com Supabase como backend.

## Cloudflare Pages

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`

O projeto já inclui `.env.production` apenas com URL e chave **publishable** do Supabase (não é chave secreta).

## Supabase

O backend já foi preparado no projeto conectado, com tabelas `ryvex_*`, RLS, bucket público `ryvex-public`, catálogo, pedidos, configurações, conteúdo e permissões de staff.

A conta que já era `super_admin` da Rede Lua foi adicionada como `owner` da RyvexMC.

## Banner e logo

O site não usa imagem de fundo gerada por IA. O hero usa o banner definido em `ryvex_site_settings.hero_banner_url`. Entre em `/staff`, faça login e envie o banner oficial pela aba Visual.

## Status

`/api/status` é uma Cloudflare Pages Function que consulta o status de `ryvexmc.pvp.srv.br:21403` através da API mcsrvstat.us. O endpoint externo exige User-Agent e mantém cache próprio; a Function adiciona uma camada de cache de borda.
