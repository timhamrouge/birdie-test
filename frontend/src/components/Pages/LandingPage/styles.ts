import styled from 'styled-components';

export const Container = styled.div`
  @media (max-width: 800px) {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0px auto;
    padding: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
  @media (min-width: 800px) {
    height: 80vh;
    width: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px;
    margin-bottom: 0px;
    margin: 0px auto;
  }
`
export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 40px;
  margin-top: 150px;
  border: 4px solid #ADE1EE;
  border-radius: 10px;
  max-width: 800px;
  @media (max-width: 800px) {
    width: 70%;
    height: 80vh;
  }
`

export const Heading = styled.h2`
  margin-top: 0;
`

export const SelectContainer = styled.select`
  border: 4px solid #ADE1EE;
  background-color: #F2E8FA;
`;

export const Option = styled.option`
  font-family: 'Atkinson+Hyperlegible', sans-serif;
`