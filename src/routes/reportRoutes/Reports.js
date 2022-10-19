import React from 'react';
import Report from '../../components/Report';
import Header from '../../components/Header';
export default function Reports() {
  return (
    <>
      <Header />
      <div
        className="reports"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          marginTop: '1%',
        }}
      >
        <Report />
      </div>
    </>
  );
}
