import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 80vh;
  max-width: 850px;
  margin-right: auto;
  margin-left: auto;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 36px;
    border: 4px solid #ADE1EE;
    border-radius: 10px;
  @media (max-width: 800px) {
    width: 100%;
  }
  padding: 16px 40px;
`