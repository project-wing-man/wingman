import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '../src/index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
const container = document.getElementById('app-root');
const root = createRoot(container);
root.render(React.createElement(App, null));
//# sourceMappingURL=index.js.map