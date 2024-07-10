import axios from 'axios';
import { FormEvent, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ItemForm } from '../components/ItemForm';


export default function EditItem() {

    let navigate = useNavigate();

    const {id} = useParams();

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


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/item/${id}`, item);
        navigate("/");
    };

    const loadItem = async () => {
        const result = await axios.get(`http://localhost:8080/item/${id}`);
        setItem(result.data);
    };

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Edit Item</h2>
                    <ItemForm onSubmit={handleSubmit} item={item} setItem={setItem} />
                </div>
        </div>
    </div>
  );
}
