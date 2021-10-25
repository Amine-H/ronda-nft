import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useTokenDetails } from '../ronda'

export const RondaToken = ({ token: {
  tokenId,
  owner,
  number,
  type,
} }) => {
  const details = useTokenDetails(tokenId)

  if (!details) {
    return <CircularProgress />
  }

  const { name, image } = details

  return (
    <Card sx={{ minWidth: 150 }}>
      <CardMedia
        component="img"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography style={{ fontWeight: 'bold' }} gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">Owner: {owner.substr(0, 15)}</Typography>
      </CardContent>
    </Card>
  );
}

