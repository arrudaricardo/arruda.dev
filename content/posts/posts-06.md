---
title: Migrating from Node.js to Bun and Deno - Simplifying JavaScript Development
description: Migrates a Node.js TypeScript application to Bun and Deno to simplify tooling and ultimately prefers Bun for its simplicity and better compatibility.
author: "Ricardo de Arruda"
date: 2024-10-13
draft: false 
tags: [nextjs, development, bun, deno]
---

This weekend, I decided to migrate my Node.js application to Bun and Deno, motivated by the release of Deno 2.0. Over time, I’ve found that Node.js TypeScript applications involve too much tooling—bundling, linting, formatting, transpilation, and more. This complexity makes JavaScript development burdensome and less enjoyable.

The application I aimed to migrate is a Node.js project using npm workspaces. It consists of a Next.js app, an API built with Hono and tRPC, a package workspace for shared code, and Puppeteer for integration tests.

### Exploring Deno

#### Pros

- Deno 2.0 Enhancements: The latest version introduces numerous features and significantly improves compatibility with Node APIs.
- Effortless Workspaces: Workspaces function seamlessly right out of the box. Sharing types between applications is straightforward, with no need for pre-execution builds.
- Improved Language Server Protocol (LSP) Support: The LSP works flawlessly within workspaces, allowing smooth navigation between applications. Previously, I encountered issues where the LSP would direct me to ./dist JavaScript files instead of the original TypeScript files—a problem that doesn’t occur with Deno.
- Simplified Task Execution: I replaced pnpm --filter with deno task --cwd. I prefer using --cwd since my terminal can auto-suggest paths. While it lacks the advanced filtering capabilities of --filter, Deno’s simplicity here is a welcome change.
- Streamlined TypeScript Configuration: With Deno, there’s no need for a tsconfig.json or separate build configurations. Deno handles TypeScript natively, allowing you to run .ts files directly with deno run ./main.ts without prior compilation.
- Simplified Dockerfile Setup: Deno reduces Dockerfile complexity by eliminating the need for additional tooling installations. For example, the following Dockerfile suffices to execute an app within a workspace:

```dockerfile
FROM debian:12-slim
COPY --from=denoland/deno:bin-2.0.0 /deno /usr/local/bin/deno
COPY . .
CMD ["deno", "task", "--cwd", "apps/web", "start"]
```

- Asked a question on deno discord and got a quick response from the community.

#### Cons

- Incompatibility with Next.js in Workspaces: A significant drawback is Deno’s inability to work with Next.js within workspaces. There are numerous open GitHub issues highlighting this limitation.
- TypeScript Errors with Next.js Components: Next.js presents several TypeScript errors. For instance, the Link component requires changing to Link.default. Additionally, importing React explicitly from 'react' is necessary to resolve element errors.
- Challenges with Editor Integration: Configuring Neovim to function with Deno or Zed was time-consuming and ultimately unproductive. I resorted to using VSCode with the Deno extension, which worked smoothly without any issues.
- Limited Advanced Filtering: While Bun supports --filter, it lacks more advanced filtering capabilities found in other package managers, which may limit complex workspace management scenarios.
- Needed to update some Node Apis with Deno, for example Deno.env.get('PORT') instead of process.env.PORT or Deno.serve instead of http.createServer for hono server.

### Assessing Bun

#### Pros

- Effective Workspace Filtering: Bun supports the --filter flag for pattern matching within workspaces, facilitating efficient workspace management.
- Reliable Workspace Operations: Workspaces operate reliably and as expected, without unexpected issues.
- Minimal Configuration Requirements: There’s no need for additional configuration files like deno.json; a simple package.json suffices, simplifying project setup.
- Seamless IDE Compatibility: Bun works out of the box with Neovim using ts-ls and with Zed, eliminating the need for extra IDE extensions. It also integrates well with VSCode.
- Smooth Operation with Drizzle-Kit CLI: The drizzle-kit CLI operates smoothly with Bun, requiring only bunx to run, contrasting with the differing approach in Deno.
- Puppeteer Compatibility: Using Puppeteer with Bun poses no issues, ensuring integration tests run without problems.
- Didn't need to update any Node Apis with Bun

#### Cons

- Buns cli is simpler and output less information than Deno. `deno --help` output a lot of information about the cli, while `bun --help` output only the basic commands.

### Conclusion

I genuinely appreciate the simplicity that both Bun and Deno bring to JavaScript development. They effectively abstract away TypeScript’s complexities, making it feel as though transpilation isn’t necessary.

However, in this specific scenario, I was disappointed with Deno. Despite its promise of working seamlessly out of the box, it fell short, particularly regarding compatibility with Next.js. Perhaps these issues will be addressed in future updates. In the meantime, I’ll continue using Bun for my projects. I have no intention of returning to Node.js, given the inherent complexity associated with TypeScript projects in that environment.

Migrating to Bun has streamlined my development process, reduced the overhead of managing multiple tools, and brought back the enjoyment of working with JavaScript. If you’re considering a similar migration, I recommend giving Bun a try—it might just simplify your workflow as it did mine.