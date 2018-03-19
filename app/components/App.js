import React from 'react';
import {Link} from 'react-router-dom';
import Routes from '../routes';
import {Grid, Navbar, Nav, Glyphicon, NavItem} from 'react-bootstrap';
import PropTypes from 'prop-types';

const App = ({location}) =>
    <div>
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <Glyphicon glyph="star" />
                </Navbar.Brand>
                <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem
                        eventKey={1}
                        componentClass={Link}
                        href="/fb?articleURL=https://5a9ebc95b1404b0014cfe239.mockapi.io/paragraphs"
                        to="/fb?articleURL=https://5a9ebc95b1404b0014cfe239.mockapi.io/paragraphs"
                        active={location.pathname === '/fb'}
                    >
                        User Page
                    </NavItem>
                    <NavItem
                        eventKey={2}
                        componentClass={Link}
                        href="/fb/results"
                        to="/fb/results"
                        active={location.pathname === '/fb/results' && !location.search}
                    >
                        EditorPage(not approved)
                    </NavItem>
                    <NavItem
                        eventKey={3}
                        componentClass={Link}
                        href="/fb/results?isApproved=true"
                        to="/fb/results?isApproved=true"
                        active={location.pathname === '/fb/results' && location.search === '?isApproved=true'}
                    >
                        EditorPage(approved)
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Grid>
            <Routes/>
        </Grid>
    </div>;

App.propTypes = {
    location: PropTypes.object.isRequired,
};

export default App;
