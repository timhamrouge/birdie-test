import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { CareRecipientInfo, Container } from './styles';

interface Props {
  careRecipientName: string;
  lastVisited: string;
  visits: any[]; // Update the type of visits array accordingly
}

const CareRecordsHeader = ({
  visits,
  lastVisited,
  careRecipientName
}: Props) => {
  return (
    <Container>
      <CareRecipientInfo>
        <img
          style={{
            maxHeight: '100px',
            maxWidth: '100px',
            borderRadius: '100px',
            border: '4px solid #ADE1EE'
          }}
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fcool-avatars-2%2F190%2F00-36-512.png&f=1&nofb=1&ipt=faf3ba44b57bac3a60af79ab49759e64f7b146d26118dacb97eb4f474ce204ab&ipo=images"
          alt="dummy-profile"
        />
        <h4>{careRecipientName}</h4>
        <p style={{ textAlign: 'center' }}>
          Last visited on {lastVisited}
        </p>
      </CareRecipientInfo>
      <ResponsiveContainer width="95%" height={300}>
        <AreaChart
          data={visits}
          margin={{ top: 50, right: 40, bottom: 50, left: 40 }}
        >
          <Area
            type="monotone"
            dataKey="visit_count"
            stroke="#00264d"
            fill="#F2E8FA"
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis
            dataKey="date"
            label={{ value: 'Date', position: 'bottom' }}
          />
          <YAxis
            label={{
              value: 'Daily visits',
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
