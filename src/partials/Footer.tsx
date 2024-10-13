import * as React from 'react';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import Logo from '../components/Logo';


// 
// Types
// 

interface LinkInterface {
  url: string;
  label: string;
};


// 
// Components
// 

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <MuiLink color="text.secondary" href="https://github.com/AI-FYP">
        All Rights Reserved
      </MuiLink>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}


// 
// Footer
// 

export default function Footer() {

  const gen_links = (links : LinkInterface[] ) => links.map(link_item => (
    <Link href={link_item.url} key={link_item.url} passHref style={{ textDecoration: 'none', color: 'inherit'}}>
      <Typography color="text.secondary" variant="body2">
        {link_item.label}
      </Typography>
    </Link>
  ));

  return (
    <React.Fragment>
      <Divider />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              <Logo />
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Just Curious about Art.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Easha S.
            </Typography>
            {gen_links([
              {url: "/about", label: "About"},
              {url: "/contact", label: "Contact Easha"},
            ])}
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Work
            </Typography>

            {gen_links([
              {url: "/gallary", label: "Gallary"},
              {url: "/tags/top", label: "Top Selected"},
            ])}
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Services
            </Typography>
            {gen_links([
              {url: "/order", label: "Order a Painting"},
              {url: "/message", label: "Send a Message"},
              {url: "/support", label: "Support"}
            ])}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            {gen_links([
              {url: "/terms-and-conditions", label: "T&C"},
            ])}
            <Copyright />
          </div>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ justifyContent: 'left', color: 'text.secondary' }}
          >
            <IconButton
              size="small"
              href="https://instagram.com/eashas001"
              aria-label="GitHub"
              sx={{ alignSelf: 'center' }}
            >
              <InstagramIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}