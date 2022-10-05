import React from 'react';
import Header from '../components/Header';
import { conferences } from '../mock/conference';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <>
      <Header />
      <div>Your Conferences</div>
      <div className="conferences">
        <p>All Conferences</p>
        {conferences.map((conference) => (
          <div className="list-group meet m-2 d-flex">
            <div class="list-group-item list-group-item-action flex-column align-items-start w-80">
              <div class="d-flex w-100 justify-content-between ">
                <h5 class="mb-1">{conference.title}</h5>
                <small>{conference.date}</small>
              </div>
              <div className="meet__functionality d-flex justify-content-between m-3">
                <Link type="button" className="btn btn-info w-25">
                  Info
                </Link>
                <button
                  className="meet__btn btn btn-danger w-25 "
                  style={{ opacity: 0.95 }}
                >
                  Delete
                </button>
                <Link type="button" class="btn btn-warning w-25">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
