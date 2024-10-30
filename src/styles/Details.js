import styled from 'styled-components';
import { Box } from '@mui/material';

export const Container = styled(Box)`
  display: flex;
  padding: 20px;
`;

export const ImageContainer = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const MainImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
`;

export const ThumbnailContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

export const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    border: 2px solid #000;
  }
`;

export const DetailsContainer = styled(Box)`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const SizeSelector = styled(Box)`
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ButtonContainer = styled(Box)`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;
