import { lazy, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { BaseOptionChartStyle } from 'components/chart';
import { ROUTES } from 'utils/constants';
import { Routes, Route, useLocation } from 'react-router-dom';
import ThemeProvider from './theme';

const Home = lazy(() => import('pages/home'));
const Health = lazy(() => import('pages/health'));

const Page404 = lazy(() => import('pages/not-found'));
const LandingPage = lazy(() => import('pages/landing'));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  const { connector, activate, active, error, account } = useWeb3React();

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Routes>
        {active ? (
          <>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.HEALTH} element={<Health />} />
          </>
        ) : (
          <Route path={ROUTES.HOME} element={<LandingPage />} />
        )}
        <Route path={ROUTES.ERROR} element={<Page404 />} />
      </Routes>
    </ThemeProvider>
  );
}
