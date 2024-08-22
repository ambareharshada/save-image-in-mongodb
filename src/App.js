import { IoMdCloudUpload } from "react-icons/io";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [displayImage, setDisplayImage] = useState("");
  const [displayAllImage, setDisplayAllImage] = useState([]);

  const imageBase64 = async (file) => {
    const reader = new FileReader();
    await reader.readAsDataURL(file);
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

  const fetchImage = async () => {
    const res = await fetch("http://localhost:5003/");
    const data = await res.json();
    setDisplayAllImage(data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (displayImage) {
      const res = await fetch("http://localhost:5003/upload", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ image: displayImage }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        alert(data.message);
        setDisplayImage("");
        fetchImage();
      }
    }
  };

  useEffect(()=>{
    fetchImage()
  },[])
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
              {displayImage ? (
                <img src={displayImage} alt="Images" />
              ) : (
                <IoMdCloudUpload />
              )}
            </div>
          </label>
          <div className="btn">
            <button onClick={handleSubmit}>UPLOAD</button>
          </div>{" "}
        </form>

        <div className="all-image">
          {displayAllImage.map((obj) => {
            return (
              <img src={obj.image} alt="" width={"320px"} height={"300px"} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
