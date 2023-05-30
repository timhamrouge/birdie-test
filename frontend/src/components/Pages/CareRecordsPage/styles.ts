import styled from 'styled-components';

export const Container = styled.div`
  @media (max-width: 800px) {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: space-around;
    margin: 0px auto;
    padding: 36px;
    margin-top: 36 px;
    margin-bottom: 0px;
  }
  @media (min-width: 800px) {
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px;
    margin-bottom: 0px;
    margin: 0px auto;
  }
`
export const Button = styled.button`
  margin: 6px;
  background-color: #F09600;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  color: white;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`