# generate-sample-env

A simple Node.js utility to generate a `env.sample` file from an existing `.env` file. This tool reads your `.env` file, extracts the environment variable names (ignoring comments and empty lines), and generates a sample `.env` file with placeholder values.

## Installation

To use this utility, you can either clone the repository or install it globally using `npm`:

### Global Installation

```bash
npm install -g generate-sample-env
```

### Local Installation

If you prefer to install it locally in your project:

```bash
npm install --save-dev generate-sample-env
```

## Usage

You can run the `generate-sample-env` script either by directly calling the binary or using npm scripts.

### Command Line

To generate a sample `.env` file from your existing `.env` file, run the following command:

```bash
generate-sample-env [envFilePath] [sampleEnvFilePath]
```

- `envFilePath` (optional): Path to the existing `.env` file (default: `.env`).
- `sampleEnvFilePath` (optional): Path to output the generated `env.sample` file (default: `env.sample`).

Example:

```bash
generate-sample-env .env env.sample
```

This command will generate a `env.sample` file based on the `env` file in the current directory.

### NPM Scripts

You can add the following scripts in your `package.json` to automate the process:

```json
"scripts": {
  "generate-sample-env": "generate-sample-env .env env.sample"
}
```

Then, you can run the command with:

```bash
npm run generate-sample-env
```

## Features

- **Ignores comments and empty lines**: Only the actual environment variables are extracted.
- **Generates a sample `.env` file**: The resulting `env.sample` will contain the same environment variable names, with `VALUE_HERE` as the placeholder for each variable.
- **Customizable file paths**: You can specify different input and output paths.

## Example

Given an existing `.env` file like this:

```
# This is a comment
DB_HOST=localhost
DB_PORT=5432
# Another comment
API_KEY=your-api-key
```

Running the script will generate a `env.sample` file that looks like:

```
DB_HOST=VALUE_HERE
DB_PORT=VALUE_HERE
API_KEY=VALUE_HERE
```

## Development

If you want to contribute or modify this tool, clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/generate-sample-env.git
cd generate-sample-env
npm install
```

### Build

To compile the TypeScript code:

```bash
npm run build
```

### Run Locally

To run the tool locally during development:

```bash
npm run dev
npm link
```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Author

Surajsinh Solanki

---

This README provides the necessary instructions for setting up, using, and contributing to the `generate-sample-env` utility.
