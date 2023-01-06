import ReactDOM from 'react-dom/client';

import App from './app';

const rootElement = document.createElement('div');
rootElement.id = 'sheldon-chrome-extension';

document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
