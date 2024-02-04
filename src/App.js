import target from './img/target.png';
import './App.css';
import React, {useState, useRef} from 'react';

function App() {
  const [image, setImage] = useState(target);
  const fileInputRef = useRef(null);

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

  const handleImageClick = () => {
    // Programmatically trigger a click on the hidden file input
    fileInputRef.current.click();
  };

  return (
    <div>
      <div class="pb-5" onClick={handleImageClick}>
        <img class="rounded mx-auto d-block" alt="preview image" style={{ width: "auto", maxHeight: "50%" }} src={image}/>
      </div>
      
        {/*<div className="App">
        <div>
          <h1>FORM:</h1>
            <img alt="preview image" src={image}/>        

            <form onSubmit={handleSubmit}>
              <input type="file" id="avatar" name="avatar" onChange={handleChange} accept="image/png, image/jpeg" />
              <button type="submit">Hi</button>
            </form>
        </div>

  </div>*/}
      <form onSubmit={handleSubmit}>
        <input type="file" ref={fileInputRef} onChange={handleChange} accept="image/png, image/jpeg " style={{ display: 'none' }} />
              <button type="submit">Hi</button>
            </form>
      
    </div>
  );
}

export default App;
