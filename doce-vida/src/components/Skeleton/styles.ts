import { styled, keyframes } from "../../styles";

export const SkeletonContainer = styled('div', {
  width: '100%',
  height: 'calc(100vh - 168px)',

  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1.5rem',
});

const skeleton = keyframes({
  '100%': {
    backgroundPosition: '-100% 0',
  }
})


interface SkeletonContentProps {
  w?: number;
  h?: number;
}

export const SkeletonContent = styled('div', {
  width: '100%',
  maxWidth: 1180,
  height: '2rem',
  borderRadius: '24px',
  background: 'linear-gradient(120deg, #c4c4cc 30%, #f0f0f0 38%, #f0f0f0 40%, #c4c4cc 48%)',
  backgroundSize: '200% 100%',
  backgroundPosition: '100% 0',
  animation: `${skeleton} 2s infinite`,
});