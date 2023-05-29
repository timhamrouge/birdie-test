import { Container } from "./styles";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CareRecordsHeader = ({visits}) => { 
  console.log('timothy', visits)
  return (
    <Container>
{/* graph goes here */}
{/* <ResponsiveContainer width="95%" height={300}>
          <AreaChart
            data={Object.values(careEventsByDate)}
            margin={{
              top: 50,
              right: 40,
              bottom: 50,
              left: 40
            }}>
            <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis
              dataKey={"date"}
              label={{
                value: 'Date',
                position: 'bottom'
              }}
            />
            <YAxis
              label={{
                value: 'Visits per day',
                angle: -90,
                position: 'insideBottomLeft'
              }}
            />
            <Tooltip />
          </AreaChart>
      </ResponsiveContainer> */}
      <ResponsiveContainer width="95%" height={300}>
      <AreaChart
            data={Object.values(visits)}
            margin={{
              top: 50,
              right: 40,
              bottom: 50,
              left: 40
            }}>
            <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis
              dataKey={"date"}
              label={{
                value: 'Date',
                position: 'bottom'
              }}
            />
            <YAxis
              label={{
                value: 'Visits per day',
                angle: -90,
                position: 'insideBottomLeft'
              }}
            />
            <Tooltip />
          </AreaChart>
</ResponsiveContainer>

    </Container>
  )
}

export default CareRecordsHeader;