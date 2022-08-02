/* eslint-disable no-const-assign */
/* eslint-disable prefer-template */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import {
  Badge,
  Button,
  CardActions,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
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
import ProfileCard from '../../Profile/ProfileCard';
import classes from './searchfield.module.css';

function SearchField(): JSX.Element {
  const [tabValue, setTabValue] = React.useState('1');
  const [expandMenu, setExpandMeny] = React.useState(false);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const [languages, setLanguages] = React.useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [fieldInput, setFieldInput] = useState('');
  const [followers, setFollowers] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [engagementValue, setEngagementValue] = React.useState('');
  const [contacted, setContacted] = React.useState('');
  const [stories, setStories] = React.useState('');
  const [tiktok, setTiktok] = React.useState('');
  const [nationality, setNationality] = React.useState('');
  const [socialBadge, setSocialBadge] = React.useState(0);
  const [geoBadge, setGeoBadge] = React.useState(0);
  const [miscBadge, setMiscBadge] = React.useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const collectedStates = [
    languages,
    followers,
    gender,
    engagementValue,
    contacted,
    stories,
    tiktok,
    nationality,
    fieldInput,
  ];

  const tabSocial = [followers, engagementValue, stories];
  const tabGeo = [nationality, languages];
  const tabMisc = [gender, contacted, tiktok];

  useEffect(() => {
    const y = tabSocial.filter(f => f.length > 0);
    const x = tabGeo.filter(f => f.length > 0);
    const z = tabMisc.filter(f => f.length > 0);
    setSocialBadge(y.length);
    setGeoBadge(x.length);
    setMiscBadge(z.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectedStates]);

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
      typeof value === 'string' ? 'languages:' + value.split(',') : value,
    );
  };

  const amountFollowers = [
    '1-999',
    '1000-4999',
    '5000-9999',
    '10 000-19 999',
    '>20 000', // does not work!
  ];
  const engagement = [
    '0-1',
    '1-2',
    '2-3',
    '3-5',
    '>5', // does not work
  ];
  const storiesPerDay = [
    '0-3',
    '4-9',
    '10-15',
    '16-25',
    '>25', // does not work
  ];

  const genderValues = ['gender:female', 'gender:male'];
  const yesNo = ['yes', 'no'];

  const countryNames = Object.values(countries.countries)
    .map(item => item.name)
    .sort();
  const languagesList = Object.values(countries.languages)
    .map(item => item.name)
    .sort();

  const FETCH_IG_USER = gql`
    query influencers($querystring: String!) {
      influencers(querystring: $querystring) {
        num_total_results
        influencers {
          ig_username
          ig_num_followers
          ig_engagement
          profile_pic_url
        }
      }
    }
  `;

  const [loadUsers, { error, loading, data }] = useLazyQuery(FETCH_IG_USER, {
    variables: { querystring: searchInput },
  });

  // eslint-disable-next-line consistent-return
  const onSubmitHandler = () => {
    const filteredStates = collectedStates.filter(s => s.length > 0);
    // console.log(filteredStates);
    // const y = filteredStates.map(s => s.split(':'));
    // console.log(y);
    setSearchInput(
      // eslint-disable-next-line prefer-template
      filteredStates.join(' '),
    );
    loadUsers();
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Loading...</div>;

  const influencerResults = data?.influencers;
  console.log('u', influencerResults);

  function mapField(fields: string[], prefix?: string) {
    let nameValues = fields.map(field => {
      const fieldValue = prefix ? prefix + ':' + field : field;
      const fieldName = field;
      return [fieldName, fieldValue];
    });
    if (prefix) {
      // add empty value option when there is a prefix
      nameValues = [['any', ''], ...nameValues];
    }
    return nameValues.map(nv => (
      <MenuItem value={nv[1]} key={nv[1]}>
        {nv[0]}&nbsp;<small>&nbsp;|&nbsp; {(Math.random() * 10000).toFixed(0)}</small>
      </MenuItem>
    ));
  }

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={classes.tabList}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label={
                  <Badge badgeContent={socialBadge} color="primary">
                    Social
                  </Badge>
                }
                value="1"
              />

              <Tab
                label={
                  <Badge badgeContent={geoBadge} color="primary">
                    Geo
                  </Badge>
                }
                value="2"
              />
              <Tab
                label={
                  <Badge badgeContent={miscBadge} color="primary">
                    Misc
                  </Badge>
                }
                value="3"
              />
              <Tab label="Expert" value="4" />
              <Tab label="History" value="5" />
              <Tab label={<Badge color="primary">About</Badge>} value="0" />
            </TabList>
          </Box>

          <TabPanel value="0">
            <div>
              <h2 className="font-medium leading-tight text-2xl mt-0 mb-2 text-blue-600">
                Some (partially) implemented UX ideas:
              </h2>
              <ul className="list-disc">
                <li>Selects contain the number of filtered results for each option after |</li>
                <li>Provide query history or saved queries</li>
                <li>Visualize the number of used filter in tab names</li>
                <li>Bring forward heavily used filters / hide others</li>
                <li>Add hints / tooltips directly with the search fields </li>
                <li>
                  Privede backwards-compatible exptert mode (like in the old search interface) for
                  advanced customization
                </li>
              </ul>
              <h2 className="font-medium leading-tight text-2xl mt-0 mb-2 text-blue-600">
                More UX ideas:
              </h2>
              <ul className="list-disc">
                <li>Automatically send the query without pressing the button</li>
              </ul>

              <h2 className="font-medium leading-tight text-2xl mt-0 mb-2 text-blue-600">
                Extra info:
              </h2>
              <ul className="list-disc">
                <li>
                  Spent two days working on it - cut the scope to show the ideas instead of
                  polishing
                </li>
                <li>Did not focus on UI (tailwind) - used MUI to prototype / save time</li>
                <li>Did not clean up the code to save time</li>
                <li>Not yet responsive - but using flexboxes</li>
              </ul>
            </div>
          </TabPanel>
          <TabPanel value="1">
            <div className={classes.tabPanel}>
              <div className={classes.tab}>
                <Tooltip
                  title="Add a fitting description of the query parameter"
                  placement="top-end"
                >
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, mr: 5 }}>
                  <InputLabel id="demo-simple-select-standard-label">Followers</InputLabel>

                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={followers}
                    onChange={e => setFollowers(e.target.value)}
                    label="Followers"
                  >
                    {mapField(amountFollowers, 'followers')}
                  </Select>
                </FormControl>
              </div>

              <div className={classes.tab}>
                <Tooltip title="Select amount of followers." placement="top-end">
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, mr: 5 }}>
                  <InputLabel id="demo-simple-select-standard-label">Engagement</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={engagementValue}
                    onChange={e => setEngagementValue(e.target.value)}
                    label="Engagement"
                  >
                    {mapField(engagement, 'engagement')}
                  </Select>
                </FormControl>
              </div>

              <div className={classes.tab}>
                <Tooltip title="Select amount of followers." placement="top-end">
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, mr: 5 }}>
                  <InputLabel id="demo-simple-select-standard-label">Stories/day</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={stories}
                    onChange={e => setStories(e.target.value)}
                    label="Stories per day"
                  >
                    {mapField(storiesPerDay, 'stories')}
                  </Select>
                </FormControl>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className={classes.tabPanel}>
              <Tooltip title="Add a fitting description of the query parameter" placement="top-end">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120, mr: 5 }}>
                <InputLabel id="demo-simple-select-standard-label">Nationality</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={nationality}
                  onChange={e => setNationality('nationality:' + e.target.value)}
                  label="Nationality"
                >
                  {mapField(countryNames)}
                </Select>
              </FormControl>

              <Tooltip title="Add a fitting description of the query parameter" placement="top-end">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <FormControl sx={{ m: 1, width: 300, mr: 5 }}>
                <InputLabel id="demo-multiple-checkbox-label">Languages</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={languages}
                  // onChange={handleLanguagesChange}
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
              <Tooltip title="Add a fitting description of the query parameter" placement="top-end">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120, mr: 5 }}>
                <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  label="Gender"
                >
                  {mapField(genderValues, 'gender')}
                </Select>
              </FormControl>
              <Tooltip title="Add a fitting description of the query parameter" placement="top-end">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120, mr: 5 }}>
                <InputLabel id="demo-simple-select-standard-label">Contacted</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={contacted}
                  onChange={e => setContacted(e.target.value)}
                  label="Contacted"
                >
                  {mapField(yesNo, 'contacted')}
                </Select>
              </FormControl>
              <Tooltip title="Add a fitting description of the query parameter" placement="top-end">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120, mr: 5 }}>
                <InputLabel id="demo-simple-select-standard-label">Tiktok</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={tiktok}
                  onChange={e => setTiktok(e.target.value)}
                  label="Intags"
                >
                  {mapField(yesNo, 'tiktok')}
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
          <TabPanel value="4">
            <div className={classes.tabPanel}>
              <Tooltip title="Show query examples here!" placement="top-end">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <TextField
                variant="standard"
                label="Create your own custom query to fine tune your search"
                fullWidth
              />
            </div>
          </TabPanel>
          <TabPanel value="5">
            Query history goes here, alt we can add favorite or saved queries here.
          </TabPanel>
          <TextField
            fullWidth
            label="Filter by username"
            variant="standard"
            onChange={e => setFieldInput(e.target.value)}
          />
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

      {influencerResults && <ProfileCard influencers={influencerResults.influencers} />}
    </>
  );
}

export default SearchField;
