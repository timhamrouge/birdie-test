export interface EventAttributes {
  payload: JSON;
  alert_id: string;
  task_instance_id: string;
  visit_id: string;
  caregiver_id: string;
  payload_as_text: string;
  rejected_event_id: string;
  observation_event_id: string;
  timestamp: string;
  id: string;
  event_type: string;
  care_recipient_id: string;
}

export interface VisitRowAttributes {
  visit_id: string;
  visit_date: string;
  events: EventAttributes[];
}

export interface DateRowAttributes {
  date: string;
  visit_count: number;
}
