/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { gql } from '@apollo/client';
import {
  Button,
  CardActions,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Tooltip,
} from '@mui/material';

import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Checkbox from '@mui/material/Checkbox';
import countries from 'countries-list';
import classes from './searchfield.module.css';

function SearchField(): JSX.Element {
  const [tabValue, setTabValue] = React.useState('1');
  const [expandMenu, setExpandMeny] = React.useState(false);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const [languages, setLanguages] = React.useState<string[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  const showMoreHandler = () => {
    setExpandMeny(true);
  };

  const handleLanguagesChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setLanguages(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const amountFollowers = ['1-999', '1000-4999', '5000-9999', '10 000-19 999', '>20 000'];
  const engagement = ['0-1', '1-2', '2-3', '3-5', '>5'];
  const storiesPerDay = ['0-3', '4-9', '10-15', '16-25', '>25'];

  const countryNames = Object.values(countries.countries)
    .map(item => item.name)
    .sort();
  const languagesList = Object.values(countries.languages)
    .map(item => item.name)
    .sort();

  const [searchInput, setSearchInput] = useState('');
  const [fieldInput, setFieldInput] = useState('');
  const [followers, setFollowers] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [engagementValue, setEngagementValue] = React.useState('');
  // const [email, setEmail] = React.useState('');
  const [contacted, setContacted] = React.useState('');
  // const [intags, setIntags] = React.useState('');
  const [stories, setStories] = React.useState('');
  const [tiktok, setTiktok] = React.useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const handleInputChange = (event: any) => {
  //   setFieldInput(event.target.value);
  // };

  // const onSettingsHandler = () => {
  //   setSettingsIsOpen(true);
  //   console.log(settingsIsOpen);
  // };

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
  // const [loadUsers, { error, loading, data }] = useLazyQuery(FETCH_IG_USER, {
  //   variables: { querystring: searchInput },
  // });

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
    console.log(searchInput);
    // loadUsers();
    // console.log(data);
  };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Loading...</div>;

  // const u = data;
  // if (u) console.log(u.influencers);
  // console.log('u', u);

  return (
    <>
      <div className="border rounded flex items-center min-w-full">
        <SearchIcon />
        <input type="text" className="w-full h-12" />
        <TuneIcon onClick={() => setSettingsIsOpen(true)} />
      </div>
      {settingsIsOpen && (
        <>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={classes.tabList}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Statistics" value="1" />
                  <Tab label="Location" value="2" />
                  <Tab label="Info" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div className={classes.tabPanel}>
                  <Tooltip title="Select amount of followers." placement="top-end">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-standard-label">Followers</InputLabel>

                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={followers}
                        onChange={e => setFollowers(e.target.value)}
                        label="Followers"
                      >
                        {amountFollowers.map(a => (
                          <MenuItem value={a}>{a}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Tooltip>
                  <Tooltip title="Select percentage of engagement." placement="top-end">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-standard-label">Engagement</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={engagementValue}
                        // onChange={() => setEngagementValue(engagement)}
                        label="Engagement"
                      >
                        {engagement.map(e => (
                          <MenuItem value={e}>{e}%</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Tooltip>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Stories/day</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={stories}
                      onChange={() => setStories(stories)}
                      label="Stories per day"
                    >
                      {storiesPerDay.map(s => (
                        <MenuItem value={s}>{s}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className={classes.tabPanel}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Nationality</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={followers}
                      onChange={() => setFollowers(followers)}
                      label="Nationality"
                    >
                      {countryNames.map(c => (
                        <MenuItem value={c}>{c}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Languages</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={languages}
                      onChange={handleLanguagesChange}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={selected => selected.join(', ')}
                      // MenuProps={MenuProps}
                    >
                      {languagesList.map(l => (
                        <MenuItem key={l} value={l}>
                          <Checkbox checked={languages.indexOf(l) > -1} />
                          <ListItemText primary={l} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div className={classes.tabPanel}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={gender}
                      onChange={() => setGender(gender)}
                      label="Gender"
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Contacted</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={contacted}
                      onChange={() => setContacted(contacted)}
                      label="Contacted"
                    >
                      <MenuItem value="no">No</MenuItem>
                      <MenuItem value="yes">Yes</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Tiktok</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={tiktok}
                      onChange={() => setTiktok(tiktok)}
                      label="Intags"
                    >
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                {!expandMenu && (
                  <Button size="small" onClick={showMoreHandler}>
                    Show more alternatives
                  </Button>
                )}
                {expandMenu && <div>Add more querys...</div>}
              </TabPanel>
              {/* */}
            </TabContext>
          </Box>

          <CardActions className={classes.cardActions}>
            <div className={classes.buttonWrapper}>
              <Button size="small" onClick={onSubmitHandler}>
                Search
              </Button>
              <Button size="small">Reset all fields</Button>
            </div>
          </CardActions>
        </>
      )}
    </>
  );
}

export default SearchField;
