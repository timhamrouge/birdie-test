import styled from 'styled-components'

export const Root = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #00264d;
  border-bottom: 2px solid #000;
  width: 100vw;
  padding: 20px 40px;
  box-sizing: border-box;
  position: fixed;
  z-index: 3;
  position: absolute;
  @media (max-width: 800px) {
    padding: 20px;
    padding: 10px 20px;
  }
`
