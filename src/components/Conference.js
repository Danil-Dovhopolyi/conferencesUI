import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Conference({ title, date }) {
  return (
    <div className="list-group meet m-2 d-flex">
      <div class="list-group-item list-group-item-action flex-column align-items-start w-80">
        <div class="d-flex w-100 justify-content-between ">
          <h5 class="mb-1">{title}</h5>
          <small>{date}</small>
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
        <div
          className="share-conf"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <button className="btn btn-success">Join</button>
          <div className="social">
            <FacebookIcon />
            <TwitterIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
