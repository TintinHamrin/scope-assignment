import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import classes from './profileCard.module.css';

type Influencer = {
  ig_username: string;
  ig_num_followers: number;
  ig_engagement: number;
  profile_pic_url: string;
};

export default function MediaControlCard({
  influencers,
}: {
  influencers: Influencer[];
}): JSX.Element {
  //   const theme = useTheme();

  return (
    <>
      {influencers.map(i => (
        <Card className={classes.card} sx={{ display: 'flex' }}>
          <Box className={classes.card} sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {i.ig_username}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {i.ig_num_followers} followers
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={i.profile_pic_url}
            alt="Live from space album cover"
          />
        </Card>
      ))}
    </>
  );
}
