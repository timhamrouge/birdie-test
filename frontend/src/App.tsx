import React from 'react';

// import './App.css';
import useGetCareRecipients from './hooks/careRecipients/useGetCareRecipients';

function App() {

  const { data, isLoading } = useGetCareRecipients();

  // console.log(data.data)
  return (
    <div className="App">
      select a care recipient
      <select name="care recipient" id="cars">
        {data && Array.isArray(data) && data.map((recipient :any) => {
          return <option>{recipient.name}</option>
        })}
      </select>

    </div>
  );
}

export default App;
