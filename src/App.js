import logo from './logo.svg';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import store from './redux/store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
    <div className='application-background'>
    <AppRoutes/>
    </div>
    </Provider>

  );
}

export default App;
