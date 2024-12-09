# E-Commerce Product Catalog with PWA Features

## Overview

This project is an e-commerce product catalog built with modern web technologies. It includes PWA features for offline support and provides a fast, smooth, and reliable user experience. Users can filter products by categories, view details, and interact with the app even in poor network conditions.

---

For more details on the concept of the solution, please refer to the [Concept of Solution](./documentation/CONCEPT.md) document.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: Ensures type safety and improves code quality.
- **Vite**: For fast builds and development environment.
- **Vite PWA Plugin**: Adds offline capabilities and installable features.
- **React Query**: For API interaction, caching, and offline sync.
- **Axios**: For HTTP requests.
- **ESLint**: For code linting.
- **Prettier**: For code formatting.
- **Husky**: For managing Git hooks.
- **Jest**: For unit testing.
- **json-server**: Simulates a RESTful API for development.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (version 18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
2. Navigate to project:
   ```bash
   cd <project_directory>
3. Install dependencies:
   ```bash
   yarn install

### Production

1. Build production:
   ```bash
   yarn build
2. Preview production:
   ```bash
   yarn preview

### FAKE API Backend

1. Start fake backend API:
   ```bash
   yarn start:json-server

### Development

1. Development mode:
   ```bash
   yarn dev

### Testing

1. Development mode:
   ```bash
   yarn test
2. Development mode:
   ```bash
   yarn lint
