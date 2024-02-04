import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(image);
  }

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
    /*console.log(event.target.files[0]);*/
  }

  return (
    <div className="App">
      <div>
        <h1>FORM:</h1>
          <img alt="preview image" src={image}/>        

          <form onSubmit={handleSubmit}>
            <input type="file" id="avatar" name="avatar" onChange={handleChange} accept="image/png, image/jpeg" />
            <button type="submit">Hi</button>
          </form>
      </div>

    </div>
  );
}

export default App;