import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Home from '@/components/Home';
import Categories from '@/components/Categories';
import Layout from '@/components/Layout';
import '@/styles/App.scss';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/categories" element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
