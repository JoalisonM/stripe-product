import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Blurhash } from "react-blurhash";

import { ImageContainer } from "./styles";
import { encodeImageToBlurhash } from "../../helpers/encode";

interface ImageProps {
  imageUrl: string;
}

export const Image = ({ imageUrl }: ImageProps) => {
  const [hashUrl, setHashUrl] = useState('');
  const [imgIsLoading, setImgIsLoading] = useState(true);

  // useEffect(() => {
  //   (async ()  => {
  //     const hash = await encodeImageToBlurhash(imageUrl);
  //     console.log("hash: ", hash);
  //     setHashUrl(hash);
  //   })();
  // }, []);

  const onLoaded = () => setImgIsLoading(false);

  return (
    <ImageContainer>
      {/* {hashUrl && <Blurhash hash={hashUrl} width={400} height={360} />} */}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: imgIsLoading ? 0 : 1 }}
        transition={{ opacity: { delay: 0.3, duration: 0.2 } }}
        onLoad={onLoaded}
        src={imageUrl}
        loading="lazy"
        width={400}
        height={360}
      />
    </ImageContainer>
  );
};