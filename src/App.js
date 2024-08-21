import { IoMdCloudUpload } from "react-icons/io";
import "./App.css";
import { useState } from "react";

function App() {
  const [displayImage, setDisplayImage] = useState("");
  const imageBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

    return data;
  };
  const handleUploadImage = async (e) => {
    const fileData = e.target.files[0];
    const image = await imageBase64(fileData);
    // console.log(image)
    setDisplayImage(image);
  };
  return (
    <>
      <div className="imageContainer">
        <form>
          <label htmlFor="uploadImage">
            <div className="uploadBox">
            <input
                type="file"
                id="uploadImage"
                onChange={handleUploadImage}
              />
              {displayImage ? <img src={displayImage} alt="Images" /> : <IoMdCloudUpload />}

             
            </div>
          </label>
          <div className="btn">
            <button>UPLOAD</button>
          </div>{" "}
        </form>
      </div>
    </>
  );
}

export default App;
