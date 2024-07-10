import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ItemForm } from '../components/ItemForm';

export default function AddItem() {

    let navigate = useNavigate();

    const [item, setItem] = useState({
        name: "",
        coverURL: "",
        type: "",
        genre: "",
        author: "",
        publisher: "",
        status: "",
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/item", item);
        navigate("/");
    };

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Add Item</h2>
                    <ItemForm onSubmit={handleSubmit} item={item} setItem={setItem}/>
                </div>
        </div>
  </div>
  );
}
