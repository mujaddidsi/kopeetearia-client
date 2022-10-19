import axios from 'axios';

import { config } from '../configs';

export async function getData(url, params) {
	try {
		return await axios.get(`${config.api_host_dev}${url}`, {
			params,
		});
	} catch (err) {
		return err;
	}
}

export async function postData(url, payload) {
	try {
		return await axios.post(`${config.api_host_dev}${url}`, payload);
	} catch (err) {
		return { err };
	}
}

export async function putData(url, payload) {
	try {
		return await axios.put(`${config.api_host_dev}${url}`, payload);
	} catch (err) {
		return { err };
	}
}

export async function deleteData(url) {
	try {
		return await axios.delete(`${config.api_host_dev}${url}`);
	} catch (err) {
		return { err };
	}
}
