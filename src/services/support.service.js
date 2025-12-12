import axios from 'axios'
import authService from './auth'

const API_URL = import.meta.env.VITE_API_URL + '/support'

const getHeaders = () => {
    const token = authService.getToken()
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

const getAdminHeaders = () => {
    const token = localStorage.getItem('adminToken')
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

const supportService = {
    // User Methods
    getTickets: async () => {
        const response = await axios.get(API_URL, getHeaders())
        return response.data
    },

    getTicket: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`, getHeaders())
        return response.data
    },

    createTicket: async (ticketData) => {
        const response = await axios.post(API_URL, ticketData, getHeaders())
        return response.data
    },

    replyToTicket: async (id, message) => {
        const response = await axios.post(`${API_URL}/${id}/reply`, { message }, getHeaders())
        return response.data
    },

    // Admin Methods
    getAllTickets: async (status) => {
        const url = `${API_URL}/admin/all${status ? `?status=${status}` : ''}`
        const response = await axios.get(url, getAdminHeaders())
        return response.data
    },

    getAdminTicket: async (id) => {
        const response = await axios.get(`${API_URL}/admin/${id}`, getAdminHeaders())
        return response.data
    },

    adminReply: async (id, message, status) => {
        const response = await axios.post(`${API_URL}/admin/${id}/reply`, { message, status }, getAdminHeaders())
        return response.data
    },

    updateStatus: async (id, status) => {
        const response = await axios.post(`${API_URL}/admin/${id}/status`, { status }, getAdminHeaders())
        return response.data
    }
}

export default supportService
