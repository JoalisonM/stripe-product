import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { Product } from "../api/product";

interface CheckoutProps {
  checkoutUrl: string;
}

interface ProductProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  defaultPriceId: string;
}

interface ProductsProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

interface ProductsContextType {
  product: ProductProps,
  loadingProduct: boolean;
  loadingProducts: boolean;
  products: ProductsProps[];
  fetchProducts: () => Promise<void>;
  getProduct: (id: string) => Promise<void>;
  checkoutSession: (priceId: string) => Promise<CheckoutProps>,
}

interface ProductsContextProviderProps {
  children: ReactNode;
}

export const ProductsContext = createContext({} as ProductsContextType);

export const ProductsContextProvider = ({ children }: ProductsContextProviderProps) => {
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [product, setProduct] = useState<ProductProps>({} as ProductProps);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoadingProducts(true);

      const response = await Product.getAll();

      setProducts(response.data);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  const getProduct = useCallback(async (id: string) => {
    try {
      setLoadingProduct(true);

      const response = await Product.get(id);

      setProduct(response.data);
    } finally {
      setLoadingProduct(false);
    }
  }, []);

  const checkoutSession = useCallback(async (priceId: string) => {
    const response = await Product.checkout(priceId);

    return response.data;
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductsContext.Provider
      value={{
        product,
        products,
        getProduct,
        fetchProducts,
        loadingProduct,
        loadingProducts,
        checkoutSession,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const product = useContextSelector(ProductsContext, (context) => context.product);
  const products = useContextSelector(ProductsContext, (context) => context.products);
  const getProduct = useContextSelector(ProductsContext, (context) => context.getProduct);
  const fetchProducts = useContextSelector(ProductsContext, (context) => context.fetchProducts);
  const loadingProduct = useContextSelector(ProductsContext, (context) => context.loadingProduct);
  const loadingProducts = useContextSelector(ProductsContext, (context) => context.loadingProducts);
  const checkoutSession = useContextSelector(ProductsContext, (context) => context.checkoutSession);

  return {
    product,
    products,
    getProduct,
    fetchProducts,
    loadingProduct,
    loadingProducts,
    checkoutSession,
  };
}