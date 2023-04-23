import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
//
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store, history } from "./store";
import AppRoutes from './routes';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<Provider store={store}>
<App />
</Provider>);

// If you want to enable client cache, register instead.
serviceWorker.unregister();


