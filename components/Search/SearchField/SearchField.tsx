/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { gql, useLazyQuery } from '@apollo/client';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import ProfileCard from 'components/Profile/ProfileCard';
import classes from './searchfield.module.css';

function SearchField(): JSX.Element {
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [fieldInput, setFieldInput] = useState('');
  const [followers, setFollowers] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [engagement, setEngagement] = React.useState('');
  const [email, setEmail] = React.useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleInputChange = (event: any) => {
    setFieldInput(event.target.value);
  };

  const handleFollowersChange = (event: any) => {
    setFollowers(event.target.value);
  };
  const handleGenderChange = (event: any) => {
    setGender(event.target.value);
  };
  const handleEngagementChange = (event: any) => {
    setEngagement(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const onSettingsHandler = () => {
    setSettingsIsOpen(true);
    console.log(settingsIsOpen);
  };

  const FETCH_IG_USER = gql`
    query influencers($querystring: String!) {
      influencers(querystring: $querystring) {
        num_total_results
        influencers {
          full_name
          ig_username
          ig_num_followers
          gender
          ig_engagement
          profile_pic_url
        }
      }
    }
  `;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadUsers, { error, loading, data }] = useLazyQuery(FETCH_IG_USER, {
    variables: { querystring: searchInput },
  });

  // eslint-disable-next-line consistent-return
  const onSubmitHandler = () => {
    console.log('clCk');
    setSearchInput(
      // eslint-disable-next-line prefer-template
      'ig_username:' +
        fieldInput +
        ' followers:' +
        followers +
        ' engagement:' +
        engagement +
        ' gender:' +
        gender,
    );
    loadUsers();
    console.log(data);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Loading...</div>;

  const u = data;
  if (u) console.log(u.influencers);
  console.log('u', u);

  return (
    <div>
      <div className="border rounded flex items-center">
        <SearchIcon />
        <input type="text" className="w-full h-12" onChange={e => handleInputChange(e)} />
        <TuneIcon onClick={onSettingsHandler} />
      </div>
      <div>
        <Button variant="outlined" onClick={onSubmitHandler}>
          Search
        </Button>
        <Button variant="outlined">Reset</Button>
      </div>
      {/* <div>{searchInput}</div> */}
      {settingsIsOpen && (
        <Card>
          <CardContent>
            <Card className={classes.sectionCard}>
              <CardContent>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">Followers</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={followers}
                    onChange={handleFollowersChange}
                    label="Followers"
                  >
                    <MenuItem value="1-999">1-999</MenuItem>
                    <MenuItem value="1000-4999">1000-4999</MenuItem>
                    <MenuItem value="5000-9999">5000-9999</MenuItem>
                    <MenuItem value="10 000-19 999">10 000-19 999</MenuItem>
                    <MenuItem value="More than 20 000">More than 20 000</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">Nationality</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={followers}
                    onChange={handleFollowersChange}
                    label="Nationality"
                  >
                    <MenuItem value="1-999">1-999</MenuItem>
                  </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">Email</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={email}
                    onChange={handleEmailChange}
                    label="Email"
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">Engagement</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={engagement}
                    onChange={handleEngagementChange}
                    label="Engagement"
                  >
                    <MenuItem value="0-1">0-1%</MenuItem>
                    <MenuItem value="1-2">1-2%</MenuItem>
                    <MenuItem value="2-3">2-3%</MenuItem>
                    <MenuItem value="3-5">3-5%</MenuItem>
                    <MenuItem value="More than 5">More than 5%</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={gender}
                    onChange={handleGenderChange}
                    label="Gender"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {u && (
        <>
          <Button variant="outlined">{u.influencers.num_total_results}</Button>
          <ProfileCard />
        </>
      )}
    </div>
  );
}

export default SearchField;
