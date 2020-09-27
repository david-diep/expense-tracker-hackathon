import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';

export default function About() {
  return (
    <Container maxWidth="sm">
      <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })
        }
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <div style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <Typography variant="h6" noWrap onClick={() => goHome()}>
                Budget Buddy
              </Typography>
              <LocalAtmIcon style={{marginLeft: "5px"}}/>
            </div>

          </Toolbar>
        </AppBar>
    </Container>
  );
}
