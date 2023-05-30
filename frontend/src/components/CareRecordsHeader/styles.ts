import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  max-width: 850px;
  margin-right: auto;
  margin-left: auto;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;
    border: 4px solid #ADE1EE;
    border-radius: 10px;
  @media (max-width: 800px) {
    width: 80%;
  }
  padding: 30px 40px;
`

export const CareRecipientInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`