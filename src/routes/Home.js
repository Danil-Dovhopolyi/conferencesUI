import React from 'react';
import Header from '../components/Header';
import Conference from '../components/Conference';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useGetConferencesQuery } from '../redux';
import { useDeleteConferencesMutation } from '../redux';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const { data = [], isLoading } = useGetConferencesQuery();
  const [deleteConferences, { isError }] = useDeleteConferencesMutation();

  const handleDeleteConferences = async (id) => {
    await deleteConferences(id);
  };
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div className="conferences">
        <p>All Conferences</p>
        <Box sx={{ width: '100%' }}>
          <Stack spacing={2} sx={{ margin: '1%' }}>
            {data.conferences.map((conference) => (
              <Item>
                <Conference
                  key={conference.id}
                  title={conference.title}
                  date={conference.date}
                  id={conference.id}
                  handleDeleteConferences={handleDeleteConferences}
                />
              </Item>
            ))}
          </Stack>
        </Box>
      </div>
    </>
  );
}
