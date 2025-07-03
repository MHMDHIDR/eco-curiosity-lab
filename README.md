## TODO:

- [ ] Build a small community of nerdies who love species of different animals 🦉🦎🦋

# Eco Curiosity Lab

Eco Curiosity Lab is a modern, extensible web application designed to foster curiosity and knowledge about the animal kingdom. Our mission is to create a vibrant community of enthusiasts, researchers, and learners who share a passion for discovering and cataloging species from around the world. The platform is built to be both beautiful and highly functional, with a focus on performance, accessibility, and extensibility.

## Project Overview

Eco Curiosity Lab enables users to:

- Explore detailed information about a wide variety of animal species.
- Connect with external APIs to pull in up-to-date, useful data about different animals (e.g., taxonomy, habitats, conservation status, fun facts).
- Share findings, discuss, and contribute to a growing knowledge base.
- (Planned) Build a small, engaged community of nerdies who love animal species.

## Core Technologies Used

This project is built on a modern, robust web stack:

- **Vite**: Lightning-fast frontend build tool and dev server.
- **React**: Component-based UI library.
- **TypeScript**: Type-safe, scalable JavaScript.
- **react-router-dom**: Declarative routing for React apps.
- **@tanstack/react-query**: Powerful data fetching and caching for React.
- **Zod**: TypeScript-first schema validation.

## Getting Started

### 1. Clone the Repository

```sh
git clone <https://github.com/MHMDHIDR/eco-curiosity-lab>
cd eco-curiosity-lab
```

### 2. Install Dependencies

#### Using npm

```sh
npm install
```

#### Using Bun

```sh
bun install
```

### 3. Start the Development Server

#### Using npm

```sh
npm run dev
```

#### Using Bun

```sh
bun dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Navigating the Project

- **/src**: Main source code directory.
  - **/src/components**: Reusable UI components (all in kebab-case, e.g., `card-animal-info.tsx`).
  - **/src/pages**: Page components and route definitions (if using file-based routing).
  - **/src/lib**: Utility functions, API clients, and helpers.
  - **/src/styles**: Tailwind and global CSS files.
  - **/src/assets**: Static assets (images, icons, etc).
- **/public**: Static files served at the root.
- **/package.json**: Project metadata, scripts, and dependencies.
- **/tailwind.config.js**: Tailwind CSS configuration.
- **/vite.config.ts**: Vite configuration.

## Extensibility

Eco Curiosity Lab is designed to be extensible:

- **API Integrations**: Easily connect to external APIs (e.g., iNaturalist, GBIF, Wikipedia) to enrich animal species data. Add new API clients in `/src/lib` and use React Query for data fetching.
- **Component-Driven**: Modular architecture allows for adding new features, data sources, or community tools by simply creating new components in `/src/components`.
- **Flexible Data Layer**: The project is structured to allow easy integration of new data sources, whether local, remote, or third-party APIs.
- **Open to Contributions**: Contribute your own API integrations, UI components, or suggest new data sources via pull requests.

## Contributing

We welcome contributions! Please open issues or submit pull requests to help us grow the community and knowledge base.

## License

MIT
