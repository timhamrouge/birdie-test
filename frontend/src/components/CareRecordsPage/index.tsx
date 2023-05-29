import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CareRecipientContext } from '../../hooks/careRecipients/careRecipientsContext';
import useGetEvents from '../../hooks/events/useGetEvents';
import useGetCaregivers from '../../hooks/caregivers/useGetCaregivers';
import CareRecordsHeader from '../CareRecordsHeader';

import { Container } from "./styles";
import VisitList from '../VisitList';

const CareRecordsPage = () => {
  // fix this empty array state
  const [visits, setVisits] = useState({});
  const [visitsGroupedByDate, setVisitsGroupedByDate] = useState({});


  const navigate = useNavigate();
  const { careRecipient } = useContext(CareRecipientContext);

  const {data: events, isLoading: eventsLoading} = useGetEvents(careRecipient?.id);

  console.log(events)

  const {data: careGivers, isLoading: careGiversLoading} = useGetCaregivers();

  useEffect(() => {
    if (events) {
      setVisits(events.eventsGroupedByVisit)
      setVisitsGroupedByDate(events.visitsGroupedByDate)
    }

    if (visits && careGivers) {
      console.log('both', visits, careGivers)
    }
  }, [events, careGivers])
  
  // handle page refresh as we're not using localStoage
  useEffect(() => {
    if (!careRecipient) { 
      navigate('/');
    }
  }, [careRecipient, navigate])

  return(
    // <CareRecordHeader>

    // </CareRecordHeader>
    <Container>
      {/* hello timothy
      {visits && Object.keys(visits).map(visit => {
        console.log(' timpthy', visit)
        return (<Visit visit={visits[visit]}/>)
      })} */}
      <CareRecordsHeader visits={visitsGroupedByDate!}/>
      {/* <VisitList visits={visits}/> */}
    </Container>
  )
};

export default CareRecordsPage;