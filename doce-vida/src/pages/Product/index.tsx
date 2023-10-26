import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Image } from "../../components/Image";
import { useProducts } from "../../hooks/useProducts";
import { ImageContainer, ProductContainer, ProductDetails } from "./styles";
import { Skeleton } from "../../components/Skeleton";

export const Product = () => {
  const { id } = useParams();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);
  const { getProduct, product, loadingProduct, checkoutSession } =
    useProducts();

  const price = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price!);

  useEffect(() => {
    id && getProduct(id);
  }, [id]);

  const handleBuyProduct = async (priceId: string) => {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await checkoutSession(priceId);

      window.location.href = response.checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert("falha ao redirecionar");
    }
  };

  return (
    <Skeleton isLoading={loadingProduct}>
      <ProductContainer>
        <ImageContainer>
          <Image imageUrl={product.imageUrl} />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{price}</span>

          <p>{product.description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={() => handleBuyProduct(product.defaultPriceId)}
          >
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </Skeleton>
  );
};
