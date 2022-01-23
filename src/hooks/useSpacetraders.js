import axios from 'axios';
import { useState, useEffect } from 'react';

const staticUser = {
    name: "jumbo-man",
    token: "387c6394-fd47-4db7-a11d-b05f32e4274f",
}

const BASE_URL = "https://api.spacetraders.io";

const useSpacetraders = () => {
    const [ user, setUser ] = useState(staticUser);
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const headers = { Authorization: `Bearer ${user.token}` }

    const getStatus = async() => {
        try{
            const response = axios.get(`${BASE_URL}/game/status`);
            if (response.ok) {
                const json = await response.json();
                setData(json);
            } else {
                throw response;
            }
        } catch(e) {
            setError(e);
            console.log("Get Status Failed: ", e);
        } finally {
            setLoading(true);
        }
    }

    const makeAuthRequest = async( url, method, payload={} ) => {
        const fullUrl = `${BASE_URL}${url}`;
        
        const request = () =>  {
            switch(method) {
                case 'get':
                    return axios.get(fullUrl, { headers })
                case 'delete':
                    return axios.get(fullUrl, { headers })
                case 'post':
                    return axios.post(fullUrl, payload, { headers })
                case 'put':
                    return axios.put(fullUrl, payload, { headers })
                default:
                    break;
            }
        }

        try{
            const resp = await request();
    
            const status = resp.status;
            const data = resp.data;
            const responseHeaders = resp.headers;
            console.log(`status: ${status} \n data: ${data} \n headers: ${responseHeaders}`);
            return data;
        }catch(error){
            console.log(error);
        }


    }

    const getUser = async() => {
        try{
            setData(await makeAuthRequest('/my/account', 'get', ));
        }catch(error){
            console.log(error);
        }
    }

    const getLeaderboard = async() => {
        try{
            setData(await makeAuthRequest('/game/leaderboard/net-worth', 'get'));
        }catch(error){
            console.log(error);
        }
    }

    //Flights

    const getFlightInfo = async(flightId) => {
        try{
            setData(await makeAuthRequest(`/my/flight-plans/${flightId}`, 'get'));
        }catch(error){
            console.log(error);
        }
    }

    const submitNewFlight = async(shipId, destination) => {
        const payload = { shipId, destination }

        try{
            setData(await makeAuthRequest(`/my/flight-plans`, 'post', payload));
        }catch(error){
            console.log(error);
        }
    }

    //Ships
    const getShips = async() =>{
        try{
            setData(await makeAuthRequest(`/my/ships`, 'get'));
        }catch(error){
            console.log(error);
        }
    }

    return {
        user,
        data,
        getUser, getStatus, 
        getLeaderboard, getShips }
}

export default useSpacetraders;