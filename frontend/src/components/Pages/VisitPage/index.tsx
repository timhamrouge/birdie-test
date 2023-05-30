import { useContext, useEffect, useState } from 'react';
import { Container, VisitSummary } from "./styles";
import { useParams } from "react-router-dom";

import {format, differenceInMinutes } from "date-fns";

import { CareRecipientContext } from '../../../hooks/careRecipients/careRecipientsContext';
import useGetVisit from '../../../hooks/events/useGetVisit';
import useGetCaregivers from '../../../hooks/caregivers/useGetCaregivers';

import Event from '../../Event';
import ProgressIndicator from '../../ProgressIndicator';



const EventX = ({event}) => {
  return <Event eventType={event.event_type}></Event>
}

const VisitPage = () => {
  console.log('hello world')
  const { careRecipient } = useContext(CareRecipientContext);
  const { visit_id: visitId } = useParams();
  const [formattedVisit, setFormattedVisit] = useState([]);
  
  const {data: visit, isLoading: visitLoading} = useGetVisit(careRecipient?.id, visitId!);
  
  const {data: careGivers, isLoading: careGiversLoading} = useGetCaregivers();

  useEffect(() => {
    if (visit && careGivers) {

      // this is truly gross but only a quick hack
      visit.events.forEach(event => {
          const caregiverId = event.caregiver_id;
          console.log(event, 'cgid', caregiverId)

          const careGiver = careGivers.find((careGiver) => {
            return careGiver.id === caregiverId
          });

          if (careGiver) {
            event.caregiver_id = `${careGiver.first_name} ${careGiver.last_name}`
          } else {
            event.caregiver_id = 'a carer.'
          }
          return event
      })

      setFormattedVisit(visit)
    }

  }, [visit, careGivers])
  console.log('formatted', careGivers, formattedVisit)

  const loading = visitLoading || careGiversLoading
  return (
    <Container>
      {loading && <ProgressIndicator/>}
      {!loading && visit && <VisitSummary>
        {<h3>Visit with {careRecipient.name} on {format(new Date(visit.visitDate), 'do LLL y')}</h3>}

        {(<p>Check in time: {format(new Date(visit.checkInTime), 'do LLL y p')}</p>)}
        {visit.checkOutTime && (<p>
          Check out time:{format(new Date(visit.checkOutTime), 'do LLL y p')}
          </p>)}

        {visit.checkOutTime && <p>Visit lasted: {differenceInMinutes(new Date(visit.checkOutTime), new Date(visit.checkInTime))} minutes.</p>}
        {/* {visit && Object.keys(visit.events).map(eventType => {
          console.log(eventType)

          return renderEventSection(eventType)
        })} */}
        {visit.events.map(event => {
          return (
          <>
          <p>
            <EventX event={event}/> - {format(new Date(event.timestamp), 'p')} by {event.caregiver_id}
          </p>
          </>
          )
        })}

</VisitSummary>}

    </Container>
  )
}

export default VisitPage