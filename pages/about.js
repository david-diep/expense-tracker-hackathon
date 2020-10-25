import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from 'next/link'

import LocalAtmIcon from '@material-ui/icons/LocalAtm';

export default function About() {
  return (
    <div style={{ background: '#ADD8E6', minHeight:"100vh" }}>
      <Container style={{
        background: '#f5f5f5', padding:'0px'}}>
        <Box>
          <Container style={{ background: '#ADD8E6', display: 'flex', justifyContent: 'center',  }}>
            <div style={{ background: '#2E3B55', color:'#f5f5f5', padding: '20px 100px 20px 20px', marginRight:'20px', }}>
              <Typography variant="h4" gutterBottom   >
                <span style={{ padding: '20px 10px 5px 10px', display: 'flex', alignItems: 'center' }}>Budget Buddy <LocalAtmIcon style={{ fontSize: '3rem', marginLeft: '10px' }} /></span>
              </Typography>
              <h3 style={{ marginLeft: "20px", paddingBottom: "10px" }} >Your one-stop expense tracker!
                <br></br>
                By <a style={{ color:'#f5f5f5'}} href='https://david-diep.com/' target=''>David Diep</a>
                <br></br>
                <a style={{ color: '#f5f5f5' }} href='https://github.com/david-diep/expense-tracker-hackathon'>Click here to checkout the code!</a>
              </h3>

              <Link href="/">
                <Button variant="contained" style={{ marginLeft: "20px", }}>Check the app out!</Button>
              </Link>
            </div>
          </Container>
          <div style={{ background: '#2E3B55', color: '#f5f5f5', paddingBottom: "5px", display: 'flex', justifyContent:'center'}}>
            <h3>Work with a seemlessly expandable navigation bar!</h3>
            <img src="/sidebar.gif" style={{ height: '350px', padding: '10px' }}></img>

          </div>

          <div style={{ background: '#2E3B55', color: '#f5f5f5', paddingBottom: "5px", display: 'flex',  justifyContent:'center'}}>
            <img src="/newaccount.gif" style={{ height: '350px', padding: '10px' }}></img>
            <div>
              <h3>Adding new accounts is easy.</h3>
              <h3>So is renaming them too!</h3>
            </div>
          </div>

        <div style={{ background: '#2E3B55', color: '#f5f5f5', paddingBottom: "5px", display: 'flex', flexDirection: 'row-reverse',  justifyContent:'center' }}>
            <img src="/addexpense.gif" style={{ height: '350px', padding: '10px' }} >
              </img>
            <div>

              <h3>Create New Expenses with Elegance.</h3>
              <h3>Edit with a click of a button!</h3>
            </div>
          </div>

        <div style={{ background: '#2E3B55', color: '#f5f5f5', paddingBottom: "5px", display: 'flex', justifyContent: 'center'}}>
            <img src="/organize.gif" style={{ height: '350px', padding: '10px' }}></img>
            <div>
              <h3>Organize your expenses by category!</h3>
              <h3>View their total cost as well!</h3>
              <Link href="/">
                <Button variant="contained" style={{ marginLeft: "20px", }}>Try me!</Button>
              </Link>
            </div>
          </div>
      </Box>
    </Container>
    </div>
  );
}
