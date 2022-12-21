/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';
import Logo from '../public/rare.jpeg';

export default function NavBar({ user }) {
  const router = useRouter();
  console.warn(router.route);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>

        <Link passHref href="/">
          <Navbar.Brand>
            <Image src={Logo} height="50px" width="50px" className="navBarLogo" />
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

            {/* To add My Posts page: */}
            <Link passHref href="/">
              <Nav.Link>My Posts</Nav.Link>
            </Link>

            <Link passHref href="/categories">
              <Nav.Link>Category Manager</Nav.Link>
            </Link>

            <Link passHref href="/tags">
              <Nav.Link>Tag Manager</Nav.Link>
            </Link>

          </Nav>

          <div className="addIcon">
            <Link passHref href="/posts/new">
              <AddIcon />
            </Link>
          </div>
          <div className="profileAvatar">
            <Link passHref href={`users/${user.id}`}>
              <Avatar src={user.profile_image_url} />
            </Link>
          </div>

          <Button variant="danger" onClick={signOut}>
            Sign Out
          </Button>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavBar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
    profile_image_url: PropTypes.string.isRequired,
  }).isRequired,
};
