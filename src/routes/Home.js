import React from 'react';
import Header from '../components/Header';
import { conferences } from '../mock/conference';
import Conference from '../components/Conference';
export default function Home() {
  return (
    <>
      <Header />
      <div>Your Conferences</div>
      <div className="conferences">
        <p>All Conferences</p>
        {conferences.map((conference) => (
          <Conference
            key={conference.id}
            title={conference.title}
            date={conference.date}
          />
        ))}
      </div>
    </>
  );
}
