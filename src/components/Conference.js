import React from 'react';
import { Link } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import { FacebookButton, FacebookCount } from 'react-social';

export default function Conference({
  title,
  date,
  id,
  handleDeleteConferences,
}) {
  let url = `http://localhost:3000/info/?id=${id}`;

  return (
    <div className="p-2">
      <div class="d-flex w-100 justify-content-between m-1">
        <h5 class="mb-1">{title}</h5>
        <small>{date}</small>
      </div>
      <div className="meet__functionality d-flex justify-content-between m-3">
        <Link
          to={`/info/?id=${id}`}
          type="button"
          className="btn btn-info w-25"
        >
          Info
        </Link>
        <Link to={`/edit/?id=${id}`} type="button" class="btn btn-warning w-25">
          Edit
        </Link>
      </div>
      <div
        className="share-conf"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <button className="btn btn-success">Join</button>
        <div className="social">
          <FacebookButton url={url} appId={436128925307607}>
            <FacebookCount url={url} />
            {' Share ' + url}
          </FacebookButton>
          <TwitterIcon />
        </div>
      </div>
    </div>
  );
}
