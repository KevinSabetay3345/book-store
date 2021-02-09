import { useState, useEffect} from 'react';

export const useFetch = (searchCode) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setIsLoaded(false);
        //orderBy=newest
        fetch("https://www.googleapis.com/books/v1/volumes?maxResults=40&q=" + searchCode)
        .then(res => res.json())
        .then(
            (result) => {
            setIsLoaded(true);
            setData(result);
            },
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        )
    }, [searchCode])

    return { error, isLoaded, data }
}