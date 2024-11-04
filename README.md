<picture>
  <source media="(max-width: 400px)" srcset="./assets/commencis-cli-logo-mobile.png">
  <img src="./assets/commencis-cli-logo.png" alt="Commencis JS Toolkit Logo">
</picture>

<h1 align="center">
  Commencis CLI

[![License: Apache](https://img.shields.io/badge/License-Apache2.0-300E77.svg)](LICENSE)

</h1>

> [!WARNING]
> The Commencis CLI is actively under development. Further enhancements are on the way, and feedback and contributions are welcome!

The Commencis CLI serves as a comprehensive command-line interface for effortlessly creating and managing projects.

This tool generates carefully crafted starter templates designed by [Commencis](https://www.commencis.com/) to meet the needs of modern applications. With a focus on best practices and clean code, the Commencis CLI empowers developers to kickstart projects with confidence.

## Usage:

Before you start, ensure you are in the directory where you want to create your project.

### Interactive Mode

To create a new project interactively, run:

```bash
npx commencis create
```

### Non-Interactive Mode

To create a new project without prompts, use the following command:

```bash
npx commencis create [project-name] [options]
```

For example, to create a project named “my-app” using the React Vite template, you would run:

```bash
npx commencis create my-app --template react-vite
```

## Options

- `--template <template-name>`: Specify the template you want to use (e.g., react-vite, etc.).

## Important Notes

> [!WARNING]
> Don’t forget to initialize git in your project:
>
> `git init`

> [!TIP]
> After creating your project, run the following command to install dependencies:
>
> `pnpm install`

## For Contributors:

### Prerequisites

#### Node.js

Before you begin, ensure you have `node: >= 20.18` installed on your system.

#### pnpm

This project uses `pnpm@9.12.3` as the package manager. You can install it either by activating with `corepack` which is the recommended way:

```bash
corepack prepare pnpm@latest --activate
corepack enable pnpm
```

or install globally on your system with npm.

```bash
npm install -g pnpm
```

### Installation

Run the following command to install project dependencies:

```bash
pnpm install
```

### Development

You can run the following command to start development environment:

```bash
pnpm run dev
```

## Contribution

We welcome contributions to improve this project. Feel free to open issues or pull requests to suggest enhancements or report any issues.

> [!IMPORTANT]
> For developers contributing to this project, it's important to familiarize yourself with these tools, as they are integral to the workflow and code quality standards.

## License

This project is licensed under the [Apache License 2.0](https://opensource.org/licenses/Apache-2.0) - see the [LICENSE](./LICENSE) file for details.

© [Commencis](https://www.commencis.com/), 2024. All rights reserved.
