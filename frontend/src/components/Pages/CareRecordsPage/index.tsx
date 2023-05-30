import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CareRecipientContext } from '../../../hooks/careRecipients/careRecipientsContext';
import useGetEvents from '../../../hooks/events/useGetEvents';
import useGetCaregivers from '../../../hooks/caregivers/useGetCaregivers';
import CareRecordsHeader from '../../CareRecordsHeader';

import {format, parse } from "date-fns";


import { Container } from "./styles";
import VisitList from '../../VisitList';

const CareRecordsPage = () => {
  // fix this empty array state
  const [visits, setVisits] = useState([]);
  const [visitsGroupedByDate, setVisitsGroupedByDate] = useState([]);
  const [lastVisited, setLastVisited] = useState<string | null>(null);

  const navigate = useNavigate();
  const { careRecipient } = useContext(CareRecipientContext);

  const {data: events, isLoading: eventsLoading} = useGetEvents(careRecipient?.id);


  const {data: careGivers, isLoading: careGiversLoading} = useGetCaregivers();


  useEffect(() => {
    if (events) {
      setVisits(events.eventsGroupedByVisit)
      setVisitsGroupedByDate(events.visitsGroupedByDate)
    }

    if (visits.length) {
      const parsedDate = parse(visits[0].visit_date, 'dd/MM/yyyy, HH:mm:ss', new Date());
      setLastVisited(format(parsedDate, 'do LLL y p'))
    }
  }, [events, visits])
  
  // handle page refresh as we're not using localStoage
  useEffect(() => {
    if (!careRecipient) { 
      navigate('/');
    }
  }, [careRecipient, navigate])

  return(
    <Container>
      <CareRecordsHeader visits={visitsGroupedByDate!} 
      // TODO handle when this is null
      careRecipientName={careRecipient?.name} lastVisited={lastVisited!}/>
      <VisitList visits={visits}/>
    </Container>
  )
};

export default CareRecordsPage;