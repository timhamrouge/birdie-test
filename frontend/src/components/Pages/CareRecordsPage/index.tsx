import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CareRecipientContext } from '../../../hooks/careRecipients/careRecipientsContext';
import useGetEvents from '../../../hooks/events/useGetEvents';
import useGetCaregivers from '../../../hooks/caregivers/useGetCaregivers';

import CareRecordsHeader from '../../CareRecordsHeader';
import ProgressIndicator from '../../ProgressIndicator';
import Visit from '../../Visit';

import { format, parse } from "date-fns";

import { Container } from "./styles";

const CareRecordsPage = () => {
  const [visits, setVisits] = useState([]);
  const [visitsGroupedByDate, setVisitsGroupedByDate] = useState([]);
  const [lastVisited, setLastVisited] = useState<string | null>(null);

  const navigate = useNavigate();
  const { careRecipient } = useContext(CareRecipientContext);

  const { data: events, isLoading: eventsLoading } = useGetEvents(careRecipient?.id);
  const { data: careGivers, isLoading: careGiversLoading } = useGetCaregivers();

  useEffect(() => {
    if (events && careGivers) {
      events.eventsGroupedByVisit.forEach(visit => {
        visit.events = visit.events.map(event => {
          const caregiverId = event.caregiver_id;

          const careGiver = careGivers.find(careGiver => careGiver.id === caregiverId);

          if (careGiver) {
            event.caregiver_id = `${careGiver.first_name} ${careGiver.last_name}`;
          } else {
            event.caregiver_id = 'a carer.';
          }

          return event;
        });
      });

      setVisits(events.eventsGroupedByVisit);
      setVisitsGroupedByDate(events.visitsGroupedByDate);
    }

    if (visits.length) {
      const parsedDate = parse(visits[0].visit_date, 'dd/MM/yyyy, HH:mm:ss', new Date());
      setLastVisited(format(parsedDate, 'do LLL y p'));
    }
  }, [events, visits, careGivers]);

  useEffect(() => {
    if (!careRecipient) {
      navigate('/');
    }
  }, [careRecipient, navigate]);

  const loading = eventsLoading || careGiversLoading;

  return (
    <Container>
      {loading && <ProgressIndicator/>}
      {!loading && (
        <>
          <CareRecordsHeader
            visits={visitsGroupedByDate!}
            careRecipientName={careRecipient?.name}
            lastVisited={lastVisited!}
          />
          <div style={{ maxHeight: "100px", width: "100%" }}>
            {visits && visits.map(visit => (
              <Visit visit={visit} key={visit.id} />
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default CareRecordsPage;
