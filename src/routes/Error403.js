import React from 'react';
import Header from '../components/Header';
export default function Error403() {
  return (
    <>
      <Header />
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: ' 85vh',
        }}
      >
        Error 403
      </h1>
    </>
  );
}
