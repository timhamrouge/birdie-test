import { Container, VisitHeader, VisitStatus, VisitHeaderSubtitle } from "./styles";
import { useContext, useEffect, useState } from 'react';
import { CareRecipientContext } from '../../hooks/careRecipients/careRecipientsContext';
import {format, parse } from "date-fns";
import { Link } from "react-router-dom";

const setStatus = (events) => {
  let statusCode = 0;
  for(let i = 0; i < events.length; i++) {
    if(events[i].event_type === 'visit_cancelled') {
      statusCode = 4;
    }
    if(events[i].event_type === 'concern_raised' && statusCode <= 3) {
      statusCode = 3
    }
    if(events[i].event_type === 'visit_completed' && statusCode <= 2) {
      statusCode = 2
    }
  }

  switch (statusCode) {
    case 4:
      return 'Visit Cancelled';
    case 3:
      return 'Concern Raised'
    case 2:
      return 'Visit Completed'
    default:
      return 'Check-in Completed'
  }
}

const Visit = ({visit}) => {
  const [visitStatus, setVisitStatus] = useState<null | string>(null);
  const { careRecipient } = useContext(CareRecipientContext);

  
  useEffect(() => {    
    if (visit) {
      setVisitStatus(setStatus(visit.events))
    }
  }, [visit])

  const visitDate = parse(visit.visit_date, 'dd/MM/yyyy, HH:mm:ss', new Date());

  return(
    <Container>
      <Link to={`/visits/${visit.visit_id}`}
        style={{
          width: "100%",
          textDecoration: "none",
          flexDirection: "column",
          color: "#00264d"
        }}
      >
        <VisitHeader>
          <h3>
            {careRecipient.name}
          </h3>
          <VisitHeaderSubtitle>
            was visited by {visit.events[0].caregiver_id} on {format(visitDate, 'do LLL y p')}
          </VisitHeaderSubtitle>
        </VisitHeader>
        <VisitStatus status={visitStatus}>
          {visitStatus}
        </VisitStatus>
      </Link>
    </Container>
  )
};

export default Visit;