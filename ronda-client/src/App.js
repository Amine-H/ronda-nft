import { useCallback, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { RondaToken } from './components/RondaToken'
import { useWeb3React } from "@web3-react/core"
import { injected } from "./connectors"
import { useAllTokens, useMint } from './ronda'


function App() {
  const { active, activate, deactivate } = useWeb3React()
  const tokens = useAllTokens()
  const mint = useMint()

  const connect = useCallback(() => {
    if (!active && activate) {
      activate(injected)?.catch((error) => {
        console.log({ error, message: 'failed to connect' })
      })
    }
  }, [active, activate])

  const disconnect = useCallback(() => {
    if (active && deactivate) {
      deactivate(injected)?.catch((error) => {
        console.log({ error, message: 'failed to connect' })
      })
    }
  }, [active, deactivate])

  useEffect(() => {
    (async () => {
      if (await injected.isAuthorized()) {
        connect()
      }
    })()
  }, [active, connect])

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ViewCarouselIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ronda NFT
          </Typography>
          <Button color="inherit" onClick={active ? disconnect : connect}>
            {active ? 'Disconnect' : 'Connect'}
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: 22 }}>
        {active && (
          tokens
            ? (
              <Grid container spacing={10}>
                {tokens.map((token) => (
                  <Grid item xs={3}>
                    <RondaToken token={token} />
                  </Grid>
                ))}
              </Grid>
            )
            : (
              <CircularProgress />
            )
        )}
      </Container>
      {active && mint && (
        <Fab style={{
          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed',
        }} onClick={() => mint(1)} color="primary" aria-label="Mint">
          <AddIcon />
        </Fab>
      )}
    </>
  );
}

export default App;
