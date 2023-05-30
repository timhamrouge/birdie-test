import {
  sentenceCase,
} from "change-case";

const Event = ({eventType}) => {
  return (
    <>
      {sentenceCase(eventType)}
    </>
  )
}

export default Event