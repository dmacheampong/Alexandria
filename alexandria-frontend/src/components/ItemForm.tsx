import { FormEvent } from 'react'
import { Link } from 'react-router-dom';

interface ItemFormProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    item: {name: string,
    coverURL: string,
    type: string,
    genre: string,
    author: string,
    publisher: string,
    status: string};
    setItem: (item: any) => void;
};

export const ItemForm = ({ onSubmit, item, setItem }: ItemFormProps) => {
    
    //const [item, setItem] = useState(initialItem);


    const genres = ['Action', 'Adventure', 'Autobiography', 'Biography', 'Children\'s Literature', 'Fantasy', 'Film', 'History',
    'Horror', 'Politics', 'Romance', 'Science Fiction'];
    const progression = ['Not Started', 'In Progress', 'Completed'];
    const types = ['Audio', 'Hardcover', 'Paperback'];


    const {name, coverURL, type, genre, author, publisher, status} = item;

    const handleInputChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        setItem({...item, [e.currentTarget.name]: e.currentTarget.value})
    };

  return (
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="Name" className="form=label">
                        Name
                    </label>
                    <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter name"
                    name="name"
                    value={name}
                    onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageURL" className="form=label">
                        Image URL
                    </label>
                    <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter URL for cover image"
                    name="coverURL"
                    value={coverURL}
                    onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="type" className="form=label">
                        Type
                    </label>
                    <select
                    className="form-select"
                    name="type"
                    value={type}
                    onChange={(e) => handleInputChange(e)}
                    required
                    >
                        <option value=''selected>Select Media Type</option>
                        {types.map((type) => 
                            <option value={type}>{type}</option>
                        )}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="genre" className="form=label">
                        Genre
                    </label>
                    <select
                    className="form-select"
                    name="genre"
                    value={genre}
                    onChange={(e) => handleInputChange(e)}
                    required
                    >
                    <option value=''selected>Select Genre</option>
                    {genres.map((genre) => {
                        return <option value={genre} defaultValue={genres[0]}>{genre}</option>
                    })}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form=label">
                        Author
                    </label>
                    <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter name of author"
                    name="author"
                    value={author}
                    onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="publisher" className="form=label">
                        Publisher
                    </label>
                    <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter name of publisher"
                    name="publisher"
                    value={publisher}
                    onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form=label">
                        Status
                    </label>
                    <select
                    className="form-select"
                    name="status"
                    value={status}
                    onChange={(e) => handleInputChange(e)}
                    required
                    >
                    <option value=''selected>Select Status</option>
                    {progression.map((status) => {
                        return <option value={status} defaultValue={progression[0]}>{status}</option>
                    })}
                    </select>
                </div>
                <button type="submit" className="btn btn-outline-primary">
                    Submit
                </button>
                <Link type="submit" className="btn btn-outline-danger mx-2" to="/">
                    Cancel
                </Link>
            </form>
  );
}
