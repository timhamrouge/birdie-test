import Visit from '../Visit';


const VisitList = ({visits}) => {

  console.log(visits)

  return(
    // TODO fix this styling
    <div style={{maxHeight: "100px"}}>
    {/* // TODO is this necessary? */}
      {visits && visits.map(visit => {
        return (<Visit visit={visit}/>)
      })}
    </div>
  )
};

export default VisitList;