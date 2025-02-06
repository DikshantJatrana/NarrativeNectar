# NarrativeNectar

Welcome to **NarrativeNectar**, a Next.js application designed to provide an exceptional user experience. This project is bootstrapped with `create-next-app` and leverages modern web development practices.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Next.js Framework**: Utilizes the power of Next.js for server-side rendering and static site generation.
- **TypeScript**: Written in TypeScript for static typing and improved developer experience.
- **Tailwind CSS**: Styled using Tailwind CSS for utility-first, responsive design.
- **Sanity.io**: Integrated with Sanity as a headless CMS for content management.
- **ESLint**: Configured with ESLint for code linting and maintaining code quality.

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/DikshantJatrana/NarrativeNectar.git
   cd NarrativeNectar
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the root directory and add any necessary environment variables. For example:

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=your_sanity_dataset
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

The project structure is as follows:

```
NarrativeNectar/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── [ComponentName].tsx
├── hooks/
│   └── [hookName].ts
├── lib/
│   └── [libFile].ts
├── models/
│   └── [modelName].ts
├── public/
│   └── [publicAssets]
├── sanity/
│   ├── schemas/
│   │   └── [schemaName].ts
│   ├── sanity.cli.ts
│   └── sanity.config.ts
├── styles/
│   └── globals.css
├── .eslintrc.js
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

- **app/**: Contains the main application components and pages.
- **components/**: Reusable React components.
- **hooks/**: Custom React hooks.
- **lib/**: Utility functions and libraries.
- **models/**: TypeScript interfaces and types.
- **public/**: Static assets like images and fonts.
- **sanity/**: Configuration and schemas for Sanity CMS.
- **styles/**: Global and component-specific styles.

## Available Scripts

In the project directory, you can run:

- `npm run dev` or `yarn dev`: Starts the development server.
- `npm run build` or `yarn build`: Builds the application for production.
- `npm run start` or `yarn start`: Runs the built application in production mode.
- `npm run lint` or `yarn lint`: Runs ESLint to check for linting errors.

## Dependencies

Key dependencies used in this project include:

- `next`: React framework for server-side rendering.
- `react` and `react-dom`: React library and DOM renderer.
- `typescript`: Adds static typing to JavaScript.
- `tailwindcss`: Utility-first CSS framework.
- `sanity`: Headless CMS for content management.
- `eslint`: Pluggable linting utility for JavaScript and TypeScript.

For a complete list of dependencies, refer to the `package.json` file.

## Contributing

Contributions are welcome! If you'd like to contribute to NarrativeNectar, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Make your changes**.
4. **Commit your changes**:

   ```bash
   git commit -m 'Add some feature'
   ```

5. **Push to the branch**:

   ```bash
   git push origin feature/YourFeatureName
   ```

6. **Open a pull request**.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the [MIT License](LICENSE). 
