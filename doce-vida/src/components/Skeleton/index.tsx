import { ReactNode, useEffect, useState } from "react";
import { SkeletonContainer, SkeletonContent } from "./styles";

interface SkeletonProps {
  w?: string;
  h?: string;
  isLoading: boolean;
  children: ReactNode;
  paragraphRows?: number;
}

export const Skeleton = ({ children, isLoading, w, h, paragraphRows = 8 }: SkeletonProps) => {
  const [rows, setRows] = useState<Array<number>>([]);

  useEffect(() => {
    let rowsList: Array<number> = [];

    for (let i = 1; i <= paragraphRows; i++) {
      rowsList.push(i);
    }

    setRows([...rows, ...rowsList]);
  }, [paragraphRows]);

  return (
    <>
      { isLoading ? (
          <SkeletonContainer>
            {
              rows.map(row => (
                <SkeletonContent key={row} />
              ))
            }
          </SkeletonContainer>
        ) : (
          <>{children}</>
        )
      }
    </>
  );
};