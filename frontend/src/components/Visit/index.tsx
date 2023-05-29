import { Container, VisitHeader, VisitStatus, VisitHeaderSubtitle } from "./styles";
import { useContext, useEffect, useState } from 'react';
import { CareRecipientContext } from '../../hooks/careRecipients/careRecipientsContext';
import format from "date-fns/format";

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
  const [careRecipeintName, setCareRecipientName] = useState(null);
  const [visitStatus, setVisitStatus] = useState<null | string>(null);
  const { careRecipient } = useContext(CareRecipientContext);

  useEffect(() => {
    if (careRecipient) {
      const formattedName = () => {
        const firstLetter = careRecipient.name.charAt(0).toUpperCase();
        return firstLetter + careRecipient.name.slice(1);
      }
      setCareRecipientName(formattedName)
    }

    if (visit) {
      setVisitStatus(setStatus(visit.events))
    }
  }, [careRecipient, visit])

  return(
    <Container>
      <VisitHeader>
        <h3>
          {careRecipeintName}
        </h3>
        <VisitHeaderSubtitle>
          was visited by {visit.events[0].caregiver_id} on {format(new Date(visit.visit_date), 'do LLL y')}
        </VisitHeaderSubtitle>
      </VisitHeader>
      <VisitStatus status={visitStatus}>
        {visitStatus}
      </VisitStatus>
    </Container>
  )
};

export default Visit;