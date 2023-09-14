import { useKeenSlider } from 'keen-slider/react';

import { HomeContainer, Product } from "./styles";
import { useProducts } from "../../hooks/useProducts";

import { Link } from 'react-router-dom';
import { Skeleton } from '../../components/Skeleton';
import { Image } from '../../components/Image';

import 'keen-slider/keen-slider.min.css';

interface ProductsProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export const ListProducts = () => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  });
  const { products, loadingProducts } = useProducts();

  return (
    <Skeleton isLoading={loadingProducts} >
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products && products.map((product: ProductsProps) => (
          <Link key={product.id} to={`product/${product.id}`}>
            <Product className="keen-slider__slide">
              <Image imageUrl={product.imageUrl} />

              <footer>
                <strong>{product.name}</strong>
                <span>
                  {
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(product.price!)
                  }
                </span>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </Skeleton>
  )
}
