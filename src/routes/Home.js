import React from 'react';
import Header from '../components/Header';
import { conferences } from '../mock/conference';
import Conference from '../components/Conference';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export default function Home() {
  return (
    <>
      <Header />
      <div className="conferences">
        <p>All Conferences</p>
        <Box sx={{ width: '100%' }}>
          <Stack spacing={2} sx={{ margin: '1%' }}>
            {conferences.map((conference) => (
              <Item>
                <Conference
                  key={conference.id}
                  title={conference.title}
                  date={conference.date}
                />
              </Item>
            ))}
          </Stack>
        </Box>
      </div>
    </>
  );
}
