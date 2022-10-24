import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function Report({ topic, id, start, end, descr }) {
  return (
    <Card sx={{ minWidth: 275, margin: '1%' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <p>{`Report #${id}`}</p>
        </Typography>
        <Typography variant="h6" component="div" sx={{ mb: 1.5 }}>
          {`Topic: ${topic}`}
        </Typography>
        <div
          className="time"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            color="text.secondary"
            sx={{ fontSize: 14 }}
          >{`Start: ${start}`}</Typography>
          <Typography
            sx={{ mb: 1.5, fontSize: 14 }}
            color="text.secondary"
          >{`End: ${end}`}</Typography>
        </div>
        <Typography
          variant="p"
          inputProps={{
            maxLength: 10,
          }}
        >{`Description: ${descr}`}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link to={`/report-info/?id=${id}`} type="button">
            Read More
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
