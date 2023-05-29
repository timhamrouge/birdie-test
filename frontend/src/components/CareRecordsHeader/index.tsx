import { Container } from './styles';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
// TODO fix types
const CareRecordsHeader = ({ visits }) => {
  return (
    <Container>
      <ResponsiveContainer width="95%" height={300}>
        <AreaChart
          data={visits}
          margin={{ top: 50, right: 40, bottom: 50, left: 40 }}
        >
          <Area
            type="monotone"
            dataKey="visit_count"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis
            dataKey="date"
            label={{ value: 'Date', position: 'bottom' }}
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
  );
};

export default CareRecordsHeader;
