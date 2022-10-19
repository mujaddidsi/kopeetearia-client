import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Marquee from 'react-fast-marquee';

function Navigation() {
	return (
		<>
			<Navbar bg='dark' variant='dark'>
				<Container>
					<Navbar.Brand href='#home'>
						<img
							src='header-img.png'
							height='46px'
							className='flex-start d-inline-block align-top'
							alt='kopeetearia-logo'
						/>
					</Navbar.Brand>
				</Container>
			</Navbar>

			<Navbar bg='primary'>
				<Marquee speed={80} gradient={false}>
					5% DISCOUNT ON ALL ESPRESSO BAR DRINKS!!! BUY NOW!!!
				</Marquee>
			</Navbar>
		</>
	);
}

export default Navigation;
