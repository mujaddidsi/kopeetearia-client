import React from 'react';

import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
	return (
		<>
			<Alert key='danger' variant='danger' align='center'>
				Cannot load details, Something went wrong.
			</Alert>
			<Container fluid='lg'>
				<Row>
					<Col></Col>
					<Col xs={6}>
						<Card align='center'>
							<Card.Img variant='top' src='notfound.jpg' />
							<Link to={'/koopetaria-app/'}>
								<Button variant='primary'>Back To Home</Button>
							</Link>
						</Card>
					</Col>
					<Col></Col>
				</Row>
			</Container>
		</>
	);
}

export default NotFound;
