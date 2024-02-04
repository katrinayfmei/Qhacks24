import target from './img/target.png';
import './App.css';
import React, {useState, useRef} from 'react';
import axios from 'axios';
import { storage } from './fbConfig';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';


function App() {
  const [image, setImage] = useState(target);
  const [tempURL, setTempURL] = useState(target)
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(0)

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(image)
    const randomString = generateRandomString()
    const storageRef = ref(storage, image.name + randomString);
    uploadBytes(storageRef, image).then(async (snapshot) => {
      console.log('Uploaded a blob or file!');
      const new_url = await getDownloadURL(snapshot.ref)
      const res = await axios.post("http://127.0.0.1:5000/predict_brain_tumor", {url: new_url})
      console.log(res)
      console.log(new_url)
      console.log(snapshot)
    });
  }

  const generateRandomString = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
  
    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  };

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      setImage((event.target.files[0]));
      setTempURL(URL.createObjectURL(event.target.files[0]))
    }
    /*console.log(event.target.files[0]);*/
  }

  const handleImageClick = () => {
    // Programmatically trigger a click on the hidden file input
    fileInputRef.current.click();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" ref={fileInputRef} onChange={handleChange} accept="image/png, image/jpeg " style={{ display: 'none' }} />
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-outline-secondary mx-2" onClick={handleImageClick}>Update Image</button>
          <button type="submit" class="btn btn-outline-success mx-2">Submit Image</button>
        </div>
      </form> 
      <div class="m-3" onClick={handleImageClick}>
        <img class="rounded mx-auto d-block" alt="preview image" style={{ width: "auto", maxHeight: "50%" }} src={tempURL}/>
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
    </div>
  );
}

export default App;
