import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { FacebookButton, FacebookCount } from 'react-social';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../hooks/useAuth';
export default function Conference({ title, date, id, creator }) {
  let url = `http://localhost:3000/info/?id=${id}`;
  const { user } = useContext(AuthContext);
  const userRoles = [];
  user?.roles.map((role) => userRoles.push(role.name));
  console.log(userRoles);

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
        <Link
          to={
            user &&
            user.user.id === creator &&
            userRoles.find((role) => role.name === 'admin' || 'conferee')
              ? '/report-create'
              : '/hello'
          }
        >
          <Button variant="contained" color="success">
            Join
          </Button>
        </Link>
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
