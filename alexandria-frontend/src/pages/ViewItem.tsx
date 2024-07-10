import axios from 'axios';
import  { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewItem () {

    const { id } = useParams();

    const [item, setItem] = useState({
        name: "",
        coverURL: "",
        type: "",
        genre: "",
        author: "",
        publisher: "",
        status: "",
    });
    
    useEffect(() => {
        loadItem();
    }, []);

    const loadItem = async () => {
        const result = await axios.get(`http://localhost:8080/item/${id}`);
        setItem(result.data);
    }

  return (
    <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4'>Details</h2>
            <div className='card'>
                <div className='card-header'>
                    <b>Item ID:</b> {id}
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>
                            <b>Name: </b>
                            {item.name}
                        </li>
                        <li className='list-group-item'>
                            <img src={item.coverURL} alt="Cover N\A" width={250}/>
                        </li>
                        <li className='list-group-item'>
                            <b>Type: </b>
                            {item.type}
                        </li>
                        <li className='list-group-item'>
                            <b>Genre: </b>
                            {item.genre}
                        </li>
                        <li className="list-group-item">
                            <b>Author: </b>
                            {item.author}
                        </li>
                        <li className="list-group-item">
                            <b>Publisher: </b>
                            {item.publisher}
                        </li>
                        <li className="list-group-item">
                            <b>Status: </b>
                            {item.status}
                        </li>
                    </ul>
                </div>
            </div>
            <Link className="btn btn-dark my-2" to={"/"}>
                Back to Home
            </Link>
        </div>
    </div>
  )
}
