import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Font Awesome
const linkFontAwesome = document.createElement("link");
linkFontAwesome.rel = "stylesheet";
linkFontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
document.head.appendChild(linkFontAwesome);

// Add Inter font family
const linkInterFont = document.createElement("link");
linkInterFont.rel = "stylesheet";
linkInterFont.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
document.head.appendChild(linkInterFont);

// Add title
const title = document.createElement("title");
title.textContent = "ResearchGPT - AI-Powered Research & Idea Generation";
document.head.appendChild(title);

createRoot(document.getElementById("root")!).render(<App />);
