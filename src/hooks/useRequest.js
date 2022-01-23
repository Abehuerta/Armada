import { useState, useEffect } from "react";


export default function useReqests(url) {

    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {

    }, [])
}