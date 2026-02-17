import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { GuideLayout } from './feature/guide';
import { GuidePage } from './feature/guide';
import { Navbar } from './feature/layout/Navbar';
import { ThemeProvider } from './feature/theme/ThemeProvider';
import Home from './pages/Home';
import Markdown from './pages/Markdown';
import Playground from './pages/Playground';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename='/play-white'>
        <ScrollToTop />
        <div className='bg-background text-foreground min-h-screen min-w-[375px]'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/playground' element={<Playground />} />
            <Route path='/markdown' element={<Markdown />} />
            <Route path='/guide' element={<GuideLayout />}>
              <Route index element={<GuidePage />} />
              <Route path=':categorySlug' element={<GuidePage />} />
              <Route path=':categorySlug/:pageSlug' element={<GuidePage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
