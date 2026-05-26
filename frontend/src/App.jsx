import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import CustomCursor from './components/ui/CustomCursor';
import ChatBot from './components/chat/ChatBot';
import HomePage from './pages/HomePage';

const ContactPage = lazy(() => import('./pages/ContactPage'));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
  </div>
);

function App() {
  return (
    <>
      <a href="#main-content" className="sr-only sr-only-focusable fixed top-2 left-2 z-[100] glass-panel rounded-lg">
        Skip to content
      </a>
      <CustomCursor />
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </main>
      <ChatBot />
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'glass-panel !text-ink !bg-surface-elevated',
          duration: 4000,
        }}
      />
    </>
  );
}

export default App;
