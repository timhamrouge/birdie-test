import { useContext, useEffect, useState } from 'react';
import { Container, VisitSummary } from "./styles";
import { useParams } from "react-router-dom";

import {format, differenceInMinutes } from "date-fns";

import { CareRecipientContext } from '../../../hooks/careRecipients/careRecipientsContext';
import useGetVisit from '../../../hooks/events/useGetVisit';
import Event from '../../Event';

const EventX = ({event}) => {
  return <Event eventType={event.event_type}></Event>
}

const VisitPage = () => {
  console.log('hello world')
  const { careRecipient } = useContext(CareRecipientContext);
  const { visit_id: visitId } = useParams();

  const {data: visit, isLoading} = useGetVisit(careRecipient?.id, visitId!);

  console.log(visit, visit?.checkOutTime)
  return (
    <Container>
      <VisitSummary>
        {visit && <h3>Visit with {careRecipient.name} on {format(new Date(visit.visitDate), 'do LLL y')}</h3>}

        {visit && (<p>Check in time: {format(new Date(visit.checkInTime), 'do LLL y p')}</p>)}
        {visit && visit.checkOutTime && (<p>
          Check out time:{format(new Date(visit.checkOutTime), 'do LLL y p')}
          </p>)}

        {visit && visit.checkOutTime && <p>Visit lasted: {differenceInMinutes(new Date(visit.checkOutTime), new Date(visit.checkInTime))} minutes.</p>}
        {/* {visit && Object.keys(visit.events).map(eventType => {
          console.log(eventType)

          return renderEventSection(eventType)
        })} */}
        {visit && visit.events.map(event => {
          return (
          <>
          <p>
            <EventX event={event}/> - {format(new Date(event.timestamp), 'p')} by 
            {event.caregiver_id}
          </p>
          </>
          )
        })}

</VisitSummary>

    </Container>
  )
}

export default VisitPage