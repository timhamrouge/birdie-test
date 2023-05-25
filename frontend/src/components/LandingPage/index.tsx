import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, ContentBox, Heading, SelectContainer, Option } from './styles';

import useGetCareRecipients from '../../hooks/careRecipients/useGetCareRecipients';

const LandingPage = () => {
  const [options, setOptions] = useState<null | {value: number, label: string, disabled?: boolean}[]>(null);

  const { data } = useGetCareRecipients();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      let options = [{value: 123, label: 'Please select', disabled: true}]
      for (let i = 0; i < data.length; i++) {
        options.push({value: data[i].id, label: data[i].name, disabled: false})
      }
      setOptions(options);
    }
  }, [data]);

  const handleChooseCareRecipient = (event :any) => {
    const selectedName = data!.find((careRecipient) => { 
      return careRecipient.id === event.target.value;
    })?.name.toLowerCase();

    navigate(`care-report/${selectedName}`);
  };

  return(
    <Container>
      <ContentBox>
        <Heading>Welcome to the birde care records portal!</Heading>

        <p>Stay connected with your elderly relatives by accessing their care records in one convenient place. Gain insights into their well-being and stay informed about the care they receive.</p>

        <p>To get started, simply select the family member you would like to view the care records for below. We understand the importance of family bonds, and we're here to provide you with a transparent and compassionate way to stay involved in their care journey.</p>

        <SelectContainer>
          {options && options.map(option => {
            return (
              <Option 
                key={option.value}
                onClick={handleChooseCareRecipient }
                disabled={option.disabled}
                value={option.value}>
                  {option.label}
              </Option>
            )
          })}
        </SelectContainer>
      </ContentBox>
    </Container>
  )
};

export default LandingPage;