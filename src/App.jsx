import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { SearchProvider } from './context/SearchContext';
import { LoadingProvider } from './context/LoadingContext';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import PageTransition from './components/animations/PageTransition';
import BackToTop from './components/layout/BackToTop';
import NotFound from './pages/NotFound';
import './styles/print.css';
import './styles/dark-mode.css';

// Pages
import Home from './pages/Home/Home';
import Resume from './pages/Resume/Resume';
import Projects from './pages/Projects/Projects';
import Skills from './pages/Skills/Skills';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/Blog/BlogPost';
import Activities from './pages/Activities/Activities';
import Contact from './pages/Contact/Contact';
import Guestbook from './pages/Guestbook/Guestbook';
import SEO from './components/SEO';

function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <SearchProvider>
        <LoadingProvider>
          <div className="min-h-screen flex flex-col">
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
            <Header />
            <main className="flex-grow pt-16">
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route
                    path="/"
                    element={
                      <PageTransition>
                        <Home />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/resume"
                    element={
                      <PageTransition>
                        <Resume />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/projects"
                    element={
                      <PageTransition>
                        <Projects />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/skills"
                    element={
                      <PageTransition>
                        <Skills />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/blog"
                    element={
                      <PageTransition>
                        <Blog />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/blog/:id"
                    element={
                      <PageTransition>
                        <BlogPost />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/activities"
                    element={
                      <PageTransition>
                        <Activities />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <PageTransition>
                        <Contact />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/guestbook"
                    element={
                      <PageTransition>
                        <Guestbook />
                      </PageTransition>
                    }
                  />
                  {/* 404 Page - Must be last */}
                  <Route
                    path="*"
                    element={
                      <PageTransition>
                        <NotFound />
                      </PageTransition>
                    }
                  />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
            <BackToTop />
          </div>
        </LoadingProvider>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
