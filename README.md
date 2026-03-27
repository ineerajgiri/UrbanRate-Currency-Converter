# UrbanRate - Smart Currency Converter
UrbanRate is a high-performance web application designed to provide seamless currency conversion with a premium User Experience. Built with a focus on Resilience and Modern UI, it ensures functionality even under unstable network conditions through advanced caching strategies.

## Key Features
* **Real-time Exchange Rates:** Integrates with a live Currency API to provide up-to-the-minute conversion data.

* **Smart Offline Caching:** Leverages the Browser LocalStorage API to persist exchange rates. If the network drops, the application gracefully switches to "Offline Mode," allowing users to continue conversions using the last saved data.

* **Persistent Dropdowns:** Engineered a fallback mechanism to ensure currency lists remain populated even during API failures, preventing UI breakage.

* **Glassmorphic Design System:** A modern, transparent interface built with Tailwind CSS, utilizing backdrop-blur and soft-edge borders for a premium aesthetic.

* **Dynamic UX Feedback:** Real-time connection monitoring providing visual cues (Warnings/Errors) based on network status.

# Tech Stack
* Frontend: React.js (Vite)

* Styling: Tailwind CSS (Custom Glassmorphism)

* State Management: Custom React Hooks (useCurrencyInfo)

* Storage: LocalStorage API (Offline-First Approach)


## Engineering Challenges Solved
* **Graceful Degradation:** Implemented a robust try-catch and fallback logic to ensure the app remains functional without a stable internet connection.

* **Data Persistence & Hydration:** Managed state synchronization between API responses and local cache to minimize redundant network requests and improve load times.

* **Asynchronous Logic:** Optimized custom hooks to handle data fetching lifecycle and prevent memory leaks or race conditions.