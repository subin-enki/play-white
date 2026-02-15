import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './feature/layout/Navbar';
import { ThemeProvider } from './feature/theme/ThemeProvider';
import Home from './pages/Home';
import Markdown from './pages/Markdown';
import Playground from './pages/Playground';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className='bg-background text-foreground min-h-screen'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/playground' element={<Playground />} />
            <Route path='/markdown' element={<Markdown />} />
            {/* <Route path='/guide' element={<Guide />} />
            <Route path='/guide/:section' element={<Guide />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
