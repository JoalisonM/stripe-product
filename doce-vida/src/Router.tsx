import { Routes, Route } from "react-router-dom";

import { Product } from "./pages/Product";
import { ListProducts } from "./pages/ListProducts";
import { DefaultLayout } from "./layout/DefaultLayout";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<ListProducts />} />
        <Route path="/product/:id" element={<Product />} />
      </Route>
    </Routes>
  );
};