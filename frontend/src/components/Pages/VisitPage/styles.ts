import styled from 'styled-components';

export const Container = styled.div`
  @media (max-width: 800px) {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

export const VisitSummary = styled.div`
  display: flex;
  width: 100%;
  max-width: 850px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 200px;
  padding: 16px;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 36px;
  border: 4px solid #ADE1EE;
  border-radius: 10px;
  @media (max-width: 800px) {
    width: 100%;
  }
`