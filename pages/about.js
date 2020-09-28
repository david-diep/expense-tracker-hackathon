import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from 'next/link'

import LocalAtmIcon from '@material-ui/icons/LocalAtm';

export default function About() {
  return (
    <div style={{ background: '#ADD8E6', height:"100vh" }}>
    <Container >
        <Box py={4} style={{
          background:  '#f5f5f5', minHeight:"90vh"}}>
          <div style={{ background: '#2E3B55', color: '#f5f5f5', paddingBottom: "5px" ,display:'flex', justifyContent:'space-between'}}>
            <div>
              <Typography variant="h4"  gutterBottom   >
                <span style={{padding: '20px 10px 5px 10px', display:'flex', alignItems:'center' }}>Budget Buddy <LocalAtmIcon style={{fontSize:'3rem', marginLeft:'10px'}} /></span>
              </Typography>
               <h3 style={{marginLeft:"20px",paddingBottom:"10px"}} >Your one-stop expense tracker!</h3>
              <Link href="/">
                <Button variant="contained" style={{ marginLeft: "20px", }}>Check it out!</Button>
              </Link>
            </div>
            <img src="/sidebar.gif" style={{ height: '350px', padding: '10px' }}></img>
          </div>

          <div style={{ background: '#2E3B55', color: '#f5f5f5', paddingBottom: "5px", display: 'flex', }}>
            <img src="/newaccount.gif" style={{ height: '350px', padding: '10px' }}></img>
            <div>
              <h3>Add New Accounts Seemlessly.</h3>
              <h3>Rename them too!</h3>
            </div>
          </div>

          <div style={{ background: '#2E3B55', color: '#f5f5f5', paddingBottom: "5px", display: 'flex', flexDirection:'row-reverse' }}>
            <img src="/addexpense.gif" style={{ height: '350px', padding: '10px' }} >
              </img>
            <div>

              <h3>Create New Expenses with Elegance.</h3>
              <h3>Full Editing Power!</h3>
            </div>
          </div>

          <div style={{ background: '#2E3B55', color: '#f5f5f5', paddingBottom: "5px", display: 'flex',}}>
            <img src="/organize.gif" style={{ height: '350px', padding: '10px' }}></img>
            <div>
              <h3>Organize your expenses by category!</h3>
              <h3>View their total cost as well!</h3>
            </div>
          </div>
      </Box>
    </Container>
    </div>
  );
}
