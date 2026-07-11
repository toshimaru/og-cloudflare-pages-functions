# Repository Guidelines

## Project Structure & Module Organization

- `functions/index.tsx` is the Cloudflare Pages Function entry point. It reads `title` and `avatar` query parameters and returns a 1200×630 Open Graph image.
- `functions/utils.ts` contains shared runtime helpers, currently the Google Fonts fetcher.
- `images/` stores static design assets such as `ogp-background.png`.
- `wrangler.toml` defines the Pages project, compatibility date, and local server settings.
- `.github/workflows/ci.yml` runs the production build for pull requests.

Keep request handling and image composition in `index.tsx`; move reusable network or transformation logic into focused modules under `functions/`.

## Build, Test, and Development Commands

Use Node.js 24 or newer:

```sh
npm ci
npm run dev
npm run build
```

`npm run dev` starts Wrangler Pages at `http://localhost:8080`. Test an image with `/?title=Hello` or add an encoded `avatar` URL. `npm run build` compiles the Pages Functions bundle into `.dist` and is the same validation CI performs. `npm run deploy` builds and deploys through Wrangler; run it only with the intended Cloudflare account selected.

## Coding Style & Naming Conventions

Write TypeScript/TSX using two-space indentation, double quotes, semicolons, and trailing commas in multiline objects. Use `camelCase` for variables and functions, `PascalCase` for types or components, and descriptive filenames such as `font-utils.ts`. Prefer explicit types at Cloudflare entry points and shared function boundaries. No formatter or linter is configured, so preserve the surrounding style and verify changes with `npm run build`.

## Testing Guidelines

There is currently no automated test framework or coverage threshold. Every change must pass `npm run build`. For behavior changes, run `npm run dev` and manually check the default response, Japanese or other Unicode titles, missing parameters, and avatar/no-avatar layouts. If adding tests, colocate them as `functions/*.test.ts` or `*.test.tsx` and add the corresponding npm script.

## Commit & Pull Request Guidelines

Recent history favors short imperative subjects and dependency-style Conventional Commit scopes, for example `build(deps-dev): bump typescript ...`. Keep commits focused and include an issue or PR number when relevant. Pull requests should explain the user-visible effect, list local verification, and link related issues. Include a generated-image screenshot when layout, typography, colors, or assets change. Ensure the pull-request build check passes before requesting review.

## Security & Configuration

Do not commit Cloudflare credentials or local environment files. Treat query parameters and fetched remote resources as untrusted input; validate new URLs and avoid exposing secrets in responses or logs.
