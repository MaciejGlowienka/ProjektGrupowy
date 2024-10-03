import React from 'react';
import api from '../General/api'

async function getAddress(id) {
  try {
    const response = await api.get(`/api/address/${id}`);
  } catch (error) {
    console.error('Error fetching address:', error);
  }
}

const Dashboard = () => {
  return (
    <div>
      <button onClick={() => console.log(getAddress(1))}>Dawaj mnie to</button>
    </div>
  );
};

export default Dashboard;
