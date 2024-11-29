import React from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function TrafficChart() {
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col xs={12} md={10} lg={8}>
          <Card>
            <Card.Body>
              <Card.Title>Traffic</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">January - July 2021</Card.Subtitle>
              
              {/* Placeholder for Chart */}
              <div style={{ height: '300px', background: '#ECF0F1', marginBottom: '20px' }}>
                <p style={{ textAlign: 'center', paddingTop: '135px' }}>Chart goes here</p>
              </div>
              
              {/* Button and Dropdown for time selection */}
              <ButtonGroup className="mb-3">
                <Button variant="outline-secondary">Day</Button>
                <Button variant="outline-secondary">Month</Button>
                <Button variant="outline-secondary">Year</Button>
                <DropdownButton as={ButtonGroup} title="" variant="outline-secondary">
                  <Dropdown.Item eventKey="1">Export</Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
              
              {/* Stats */}
              <Row>
                <Col>
                  <div className="text-center">
                    <p className="mb-0">Visits</p>
                    <h5>29,703 Users (40%)</h5>
                  </div>
                </Col>
                <Col>
                  <div className="text-center">
                    <p className="mb-0">Unique</p>
                    <h5>24,093 Users (20%)</h5>
                  </div>
                </Col>
                <Col>
                  <div className="text-center">
                    <p className="mb-0">Pageviews</p>
                    <h5>78,706 Views (60%)</h5>
                  </div>
                </Col>
                <Col>
                  <div className="text-center">
                    <p className="mb-0">New Users</p>
                    <h5>22,123 Users (80%)</h5>
                  </div>
                </Col>
                <Col>
                  <div className="text-center">
                    <p className="mb-0">Bounce Rate</p>
                    <h5>40.15%</h5>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TrafficChart;
