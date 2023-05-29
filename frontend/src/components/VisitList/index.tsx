import Visit from '../Visit';


const VisitList = ({visits}) => {

  console.log(visits)

  return(
    <>
      {visits && visits.map(visit => {
        // console.log(' timpthy', visit)
        return (<Visit visit={visit}/>)
      })}
    </>
  )
};

export default VisitList;