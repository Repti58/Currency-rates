import './App.css';
import CurrencyList from './CurrencyList/CurrencyList';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
    <Routes>
    <Route path='/currency_tablets' element={<CurrencyList />} />
      
    </Routes>
    </div>
  );
}

export default App;
