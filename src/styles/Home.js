import styled from 'styled-components';

export const CoverImage = styled.img`
  width: 80%; 
  height: auto;
  display: block;
  margin: 0 auto; 
  border-radius: 8px; 
`;

export const Title = styled.h2`
  text-align: center;
  margin: 20px 0;
  font-size: 2rem; 
  color: #333; 
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px; 
`;

export const Card = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 200px; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center; 
  overflow: hidden; 
  
  img {
    padding:20px;
    width: 70%; 
    height: 200px; 
    object-fit: contain; 
  }
  
  h3 {
    padding: 10px; 
    font-size: 1.2rem; 
    color: #333; 
  }
`;
