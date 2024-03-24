import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

/*
dist/index.html                   0.49 kB │ gzip:   0.31 kB
dist/assets/index-c851c0ea.css   29.97 kB │ gzip:   5.09 kB
dist/assets/index-75130ea2.js   513.09 kB │ gzip: 148.08 kB
 */

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import HomePage from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const HomePage = lazy(() => import("./pages/Homepage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

/*
dist/index.html                           0.49 kB │ gzip:   0.31 kB   
dist/assets/Logo-81b2c976.css             0.03 kB │ gzip:   0.05 kB   
dist/assets/Login-b7d792c3.css            0.35 kB │ gzip:   0.22 kB   
dist/assets/Product-9f395e2d.css          0.47 kB │ gzip:   0.27 kB   
dist/assets/Homepage-468254c3.css         0.51 kB │ gzip:   0.30 kB   
dist/assets/PageNav-4503fc2e.css          0.51 kB │ gzip:   0.28 kB   
dist/assets/AppLayout-ad7167c9.css        1.91 kB │ gzip:   0.70 kB   
dist/assets/index-76ca7465.css           26.30 kB │ gzip:   4.40 kB   
dist/assets/Product.module-8d683417.js    0.06 kB │ gzip:   0.07 kB   
dist/assets/PageNotFound-77391e83.js      0.14 kB │ gzip:   0.15 kB   
dist/assets/Logo-ef30193d.js              0.21 kB │ gzip:   0.19 kB   
dist/assets/PageNav-508dfc35.js           0.45 kB │ gzip:   0.27 kB   
dist/assets/Pricing-609cb60c.js           0.62 kB │ gzip:   0.41 kB   
dist/assets/Homepage-c76fd7dc.js          0.64 kB │ gzip:   0.41 kB   
dist/assets/Product-e1dab4b0.js           0.83 kB │ gzip:   0.48 kB   
dist/assets/Login-d7a41531.js             0.98 kB │ gzip:   0.54 kB   
dist/assets/AppLayout-2a864bf7.js       156.85 kB │ gzip:  46.18 kB   
dist/assets/index-e472d5d7.js           354.91 kB │ gzip: 101.37 kB */

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="cities" element={<CityList />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
