import React from 'react';
import Report from '../../components/Report';
import Header from '../../components/Header';
import { useGetReportsQuery } from '../../redux';
export default function Reports() {
  const { data = [], isLoading } = useGetReportsQuery();
  if (isLoading) return <p>Loading...</p>;
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
        {data.reports.map((report) => (
          <Report
            key={report.id}
            topic={report.topic}
            id={report.id}
            start={report.dateStart}
            end={report.dateEnd}
            descr={report.description}
          />
        ))}
      </div>
    </>
  );
}
