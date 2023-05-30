import { format, parse } from "date-fns";
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CareRecipientContext } from '../../../hooks/careRecipients/careRecipientsContext';
import useGetEvents from '../../../hooks/events/useGetEvents';
import useGetCaregivers from '../../../hooks/caregivers/useGetCaregivers';

import CareRecordsHeader from '../../CareRecordsHeader';
import ProgressIndicator from '../../ProgressIndicator';
import Visit from '../../Visit';

import { Button, Container } from "./styles";

const CareRecordsPage = () => {
  const [visits, setVisits] = useState([]);
  const [visitsGroupedByDate, setVisitsGroupedByDate] = useState([]);
  const [lastVisited, setLastVisited] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const navigate = useNavigate();
  const { careRecipient } = useContext(CareRecipientContext);

  const { data: events, isLoading: eventsLoading } = useGetEvents(careRecipient?.id, pageNumber);
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
      const parsedDate = parse(events.lastVisited, 'dd/MM/yyyy, HH:mm:ss', new Date());
      setLastVisited(format(parsedDate, 'do LLL y p'));
    }
  }, [events, careGivers]);

  useEffect(() => {
    if (!careRecipient) {
      navigate('/');
    }
  }, [careRecipient, navigate]);

  const incrementPage = () => {
    setPageNumber(pageNumber + 1)
  }

  const decrementPage = () => {
    setPageNumber(pageNumber - 1)
  }

  const loading = eventsLoading || careGiversLoading;

  console.log(eventsLoading)
  return (
    <Container>
      {loading && <ProgressIndicator/>}
      {!loading && events && (
        <>
          <CareRecordsHeader
            visits={visitsGroupedByDate!}
            careRecipientName={careRecipient?.name}
            lastVisited={lastVisited!}
          />
          <div style={{ marginBottom: "16px" }}>
            {pageNumber > 1 && (
              <Button onClick={decrementPage}>
                Last page
              </Button>
            )}
            {pageNumber !== +events.pages && <Button onClick={incrementPage}>
              Next page
            </Button>}
          </div>
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
