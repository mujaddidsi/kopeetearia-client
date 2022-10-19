import React, { useState, useEffect } from 'react';

import { getData, deleteData, postData, putData } from '../../utils/fetch';

import {
	Alert,
	Button,
	Card,
	Container,
	Row,
	Col,
	Table,
	Form,
} from 'react-bootstrap';

function LandingPage() {
	const [dbData, setDbData] = useState([]);

	const initForm = {
		orderName: '',
		price: '',
		discounted: false,
	};
	const [orderForm, setOrderForm] = useState(initForm);

	const [regularBill, setRegularBill] = useState();
	const [discountedBill, setDiscountedBill] = useState();
	const [isEdit, setIsEdit] = useState(false);
	const [dataEdit, setDataEdit] = useState({
		id: '',
		orderName: '',
		price: '',
		discounted: false,
	});

	const [show, setShow] = useState(false);
	const [errorShow, setErrorShow] = useState(false);
	const [message, setMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const fetchData = async () => {
		try {
			const resAllOrders = await getData('/orders');
			setDbData(resAllOrders.data);
		} catch (error) {
			setErrorShow(true);
			setErrorMessage('Cannot load details. Something went wrong.');
		}

		try {
			const resRegularBill = await getData('/regular-bill');
			setRegularBill(resRegularBill.data.data);
		} catch (error) {
			setErrorShow(true);
			setErrorMessage('Cannot regular bill. Something went wrong.');
		}

		try {
			const resDiscountedBill = await getData('/discounted-bill');
			setDiscountedBill(resDiscountedBill.data.data);
		} catch (error) {
			setErrorShow(true);
			setErrorMessage('Cannot discounted bill. Something went wrong.');
		}
	};

	let roundRegularBill = Number(regularBill).toFixed(2);
	let roundDiscountedBill = Number(discountedBill).toFixed(2);

	const handleChange = (e) => {
		if (e.target.name === 'discounted' && e.target.checked === true) {
			e.target.value = true;
		}
		if (e.target.name === 'discounted' && e.target.checked === false) {
			e.target.value = false;
		}

		setOrderForm({ ...orderForm, [e.target.name]: e.target.value });
	};

	const handleEdit = (e) => {
		console.log(e.target.checked);
		console.log(e.target.value);
		if (e.target.name === 'discounted' && e.target.checked === true) {
			e.target.value = true;
		}
		if (e.target.name === 'discounted' && e.target.checked === false) {
			e.target.value = false;
		}

		setDataEdit({ ...dataEdit, [e.target.name]: e.target.value });
	};

	const onRemoveDataClick = async (id) => {
		try {
			await deleteData(`/order/${id}`);
			fetchData();

			setShow(true);
			setMessage('Order is successfully deleted');
		} catch (error) {
			setErrorShow(true);
			setErrorMessage('Unable to delete order. Something went wrong.');
		}
	};

	const onAddOrderClick = async () => {
		try {
			await postData('/order', orderForm);
			fetchData();

			setShow(true);
			setMessage('Order is successfully added');
		} catch (error) {
			setErrorShow(true);
			setErrorMessage('Unable to add order. Something went wrong.');
		}
	};

	const onEditClick = (id, orderName, price, discounted) => {
		try {
			setIsEdit(true);
			setDataEdit({ id, orderName, price, discounted });
		} catch (error) {
			alert(error);
		}
	};

	const onUpdateClick = async (id) => {
		try {
			await console.log({ dataEdit });
			await putData(`/order/${id}`, dataEdit);
			setIsEdit(false);
			setDataEdit(null);
			fetchData();

			setShow(true);
			setMessage('Order is successfully updated');
		} catch (error) {
			setErrorShow(true);
			setErrorMessage('Unable to update order. Something went wrong.');
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Container fluid style={{ marginBottom: 40 }}>
				{show && (
					<Alert variant='success' onClose={() => setShow(false)} dismissible>
						<Alert.Heading>{message}</Alert.Heading>
					</Alert>
				)}
				{errorShow && (
					<Alert
						variant='danger'
						onClose={() => setErrorShow(false)}
						dismissible>
						<Alert.Heading>{errorMessage}</Alert.Heading>
					</Alert>
				)}
				<Row>
					<Col md={4}>
						<Card style={{ marginTop: 30, marginLeft: 30, marginBottom: 30 }}>
							<Card.Img variant='left' src='menu.png' />
						</Card>
					</Col>
					<Col>
						<Card
							style={{
								marginTop: 30,
								marginLeft: 0,
								marginBottom: 30,
								marginRight: 30,
							}}>
							<Card.Title align='center'>Add Your Order</Card.Title>
							<Table>
								<thead align='center'>
									<tr>
										<th>Order Item</th>
										<th>Price</th>
										<th>On 5% Promo?</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody align='center'>
									<tr>
										<td>
											<input
												id='orderName'
												name='orderName'
												onChange={handleChange}
											/>
										</td>
										<td>
											<input id='price' name='price' onChange={handleChange} />
										</td>
										<td>
											<Form.Check
												id='discounted'
												name='discounted'
												type='checkbox'
												onChange={handleChange}
											/>
										</td>
										<td>
											<Button
												id='addOrder'
												variant='primary'
												size='sm'
												onClick={onAddOrderClick}>
												Place Order
											</Button>
										</td>
									</tr>
								</tbody>
							</Table>
						</Card>
						<Card>
							<Card.Title align='center'>
								Attendeing Clerk: Joseph Joestar
							</Card.Title>
							<Table>
								<thead align='center'>
									<tr>
										<th>Order Item</th>
										<th>Price</th>
										<th>On 5% Promo?</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody align='center'>
									{dbData?.map((data, index) => (
										<tr key={data.id}>
											<td>{data.orderName}</td>
											<td>{data.price}</td>
											<td>
												{data.discounted && (
													<Form.Check disabled checked type='checkbox' />
												)}
												{!data.discounted && (
													<Form.Check disabled type='checkbox' />
												)}
											</td>
											<td>
												<Button
													id='editOrder'
													size='sm'
													variant='light'
													onClick={() =>
														onEditClick(
															data.id,
															data.orderName,
															data.price,
															data.discounted
														)
													}>
													Edit
												</Button>
												<Button
													id='deleteOrder'
													size='sm'
													variant='light'
													onClick={() => onRemoveDataClick(data.id)}>
													Delete
												</Button>
											</td>
										</tr>
									))}
									{isEdit === true && (
										<tr>
											<td>
												<input
													id='updateName'
													name='orderName'
													onChange={handleEdit}
													value={dataEdit.orderName}
												/>
											</td>
											<td>
												<input
													id='updatePrice'
													name='price'
													onChange={handleEdit}
													value={dataEdit.price}
												/>
											</td>
											<td>
												<Form.Check
													id='updateDiscounted'
													name='discounted'
													type='checkbox'
													onChange={handleEdit}
													value={dataEdit.discounted}
												/>

												{/* <Form.Check
													checked={dataEdit.discounted}
													name='discounted'
													type='checkbox'
													value={dataEdit.discounted}
													onChange={handleEdit}
												/> */}

												{/* {!dataEdit.discounted && (
													<Form.Check
														name='discounted'
														type='checkbox'
														value={dataEdit.discounted}
													/>
												)} */}
											</td>
											<td>
												<Button
													id='updateOrder'
													size='sm'
													variant='light'
													onClick={() => onUpdateClick(dataEdit.id)}>
													Update
												</Button>
												<Button
													size='sm'
													variant='light'
													onClick={() => {
														setIsEdit(false);
														setDataEdit(null);
													}}>
													Cancel
												</Button>
											</td>
										</tr>
									)}
								</tbody>
							</Table>
							<Card.Subtitle align='center' className='mb-3'>
								Total Regular Bill: {roundRegularBill}
							</Card.Subtitle>
							<Card.Subtitle align='center'>
								Total Discounted Bill: {roundDiscountedBill}
							</Card.Subtitle>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default LandingPage;
