import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// 清理旧的 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (const registration of registrations) {
      registration.unregister();
    }
  }).then(() => {
    // 清理缓存
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      });
    }
  }).then(() => {
    // 如果当前页面是通过 Service Worker 加载的，刷新页面
    if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD) {
      window.location.reload();
    }
  });
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element");
}

createRoot(rootElement).render(<App />);
