import Visit from '../Visit';


const VisitList = ({visits, }) => {

  console.log(visits)

  return(
    <>
      {visits && Object.keys(visits).map(visit => {
        // console.log(' timpthy', visit)
        return (<Visit visit={visits[visit]}/>)
      })}
    </>
  )
};

export default VisitList;