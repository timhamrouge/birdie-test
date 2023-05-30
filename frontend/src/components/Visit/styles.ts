import styled from 'styled-components'

interface VisitStatusProps {
  status: string | null;
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 850px;
  margin-right: auto;
  margin-left: auto;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 36px;
  border: 4px solid #ADE1EE;
  border-radius: 10px;
  @media (max-width: 800px) {
    width: 80%;
  }
  top:0;
  cursor: pointer;
  transition: ease 0.3s;
  &:hover {
    top: -2px;
    box-shadow: 5px 5px 0 0 #b6e5e5;
  }
`

export const VisitHeader = styled.div`
  display: flex;
  align-items: center;
  padding 0 20px;
`

export const VisitHeaderSubtitle = styled.div`
  margin-left: 10px;
`

const setStatusColour = (status: string) => {
  switch (status) {
    case 'Visit Cancelled':
      return '#CD4631';
    case 'Concern Raised':
      return '#FFA737'
    case 'Visit Completed':
      return '#4C956C'
    default:
      return '#A1B1BA'
  }
};

export const VisitStatus = styled.div<VisitStatusProps>`
  padding: 16px;
  background-color: ${props => setStatusColour(props.status!)};
  border-radius: 0 0 6px 6px;
  color: white; 
`