// import { Root } from "./styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck, faGlassWater, faPills, faDroplet, faTriangleExclamation, faFaceSmile, faXmark, faCheck, faEye, faUtensils } from '@fortawesome/free-solid-svg-icons'

const EventIcon = ({eventType}) => {
  const getIcon = (eventType) => {
    switch (eventType) {
      case 'fluid_intake_observation':
        return <FontAwesomeIcon icon={faGlassWater} />
      case 'regular_medication_taken':
      case 'regular_medication_maybe_taken':
      case 'regular_medication_not_taken':
        return <FontAwesomeIcon icon={faPills} />
      case 'visit_cancelled':
        return <FontAwesomeIcon icon={faXmark} />
      case 'food_intake_observation':
        return <FontAwesomeIcon icon={faUtensils} />
      case 'visit_completed':
      case 'task_completed':
        return <FontAwesomeIcon icon={faCheck} />
      case 'general_observation':
        return <FontAwesomeIcon icon={faEye} />
      case 'incontinence_pad_observation':
        return <FontAwesomeIcon icon={faDroplet} />
      case 'concern_raised':
        return <FontAwesomeIcon icon={faTriangleExclamation} />
        case 'mood_observation':
          return <FontAwesomeIcon icon={faFaceSmile} />
      default:
        return <FontAwesomeIcon icon={faListCheck} />
    }
  }
  return (
    getIcon(eventType)
  )
}

export default EventIcon;