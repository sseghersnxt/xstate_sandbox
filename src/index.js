import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { mswWorker } from "./msw/mswSetup";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Ensure MSW is ready first
mswWorker.start().then(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}).catch(error => {
  console.log('issues', error);
});