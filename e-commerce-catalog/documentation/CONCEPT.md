# E-Commerce Product Catalog with PWA Features

---

## Concept of the Solution

The e-commerce product catalog is built with React and TypeScript, optimized for performance, scalability, and a smooth user experience. Leveraging modern web technologies like Vite, PWA, and React Query, the app provides offline capabilities, fast loading, and reliable data fetching. Skeleton loading animations and image lazy loading are incorporated to enhance UX on slow connections.

### Key Features:
1. **Product Listing**: Displays products with essential details like name, price, and availability.
2. **Filtering by Category**: Users can filter products by categories fetched from the `/api/categories` endpoint.
3. **Offline Support**: The app is installable and works offline by caching API responses and assets (images and endpoints).
4. **Caching and Reconnection**: Data is cached using `React Query` and stored in local storage for offline access. React Query ensures seamless reconnection to APIs when network conditions improve.
5. **PWA Integration**: Allows users to install the app on their devices for a native-like experience.

---

## Technologies Used

1. **Frontend Framework**: React with TypeScript
2. **Bundler**: Vite for fast build times and efficient development
3. **State Management**: React Query for data fetching, caching, and sync
4. **Mock Backend**: `json-server` to simulate RESTful APIs
5. **PWA Features**: Vite PWA plugin for offline capabilities
6. **Utilities**: Axios for HTTP requests, ESLint, Prettier, Husky for code quality
7. **Testing**: Jest for unit testing
8. **UX Enhancements**: Lazy loading for images and skeleton animations

---

## Key Implementation Decisions

1. **React Query for API Interaction**:  
   - Ensures real-time data synchronization with APIs.  
   - Provides caching and stale data management, allowing smooth offline and online transitions.

2. **Vite PWA for Offline Support**:  
   - Caches static assets (e.g., CSS, JS, images).  
   - Supports background synchronization and installation on devices.

3. **Local Storage as Backup Cache**:  
   - Stores API responses to enable offline access even if React Query's cache expires.

4. **Image Optimization**:  
   - Lazy loading defers image downloads until needed.  
   - Skeleton loading ensures a visually smooth experience while data is fetched.

5. **Mock Backend**:  
   - `json-server` serves as a quick and scalable solution for simulating the backend during development.

---

## Pros and Cons of the Solution

| **Aspect**              | **Pros**                                                                                 | **Cons**                                                                                      |
|--------------------------|-----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| **React Query**          | Easy caching, stale data handling, and offline sync.                                    | Adds an additional dependency; slight learning curve for beginners.                         |
| **Vite PWA Plugin**      | Simplifies offline support and app installation.                                        | Limited flexibility compared to manual Workbox integration.                                 |
| **Skeleton Loading**     | Improves perceived performance on slow connections.                                     | Adds slight complexity to the UI code.                                                      |
| **Local Storage**        | Ensures persistence of data even beyond React Query’s cache.                            | Requires management of local storage size and cache invalidation strategies.                |
| **json-server**          | Rapid prototyping without the need for a real backend.                                  | Not suitable for production use; additional effort required to transition to real endpoints.|
| **React + TypeScript**   | Strong typing reduces runtime errors and improves developer experience.                 | Initial setup and configuration may be overwhelming for beginners.                          |
| **Axios**                | Simplifies HTTP requests with powerful features.                                        | Adds a dependency that could be avoided with native `fetch` API in modern browsers.         |
---

This solution ensures a performant, user-friendly catalog app with offline capabilities, demonstrating modern web development practices.
