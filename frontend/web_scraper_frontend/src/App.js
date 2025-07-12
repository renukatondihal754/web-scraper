import React, {useState} from "react";
import axios from "axios";

function App(){
  const [urls, setUrls] =  useState("");
  const [result, setResult] = useState([]);
  
  const handleScrape = async () =>{
    const urlArray = urls.split("\n").filter(Boolean);
    try{
      const response = await axios.post("http://localhost:5000/scrape",{
        urls : urlArray,

      });
      setResult(response.data.data);

    }catch(error){
      alert("Error Message:" + error.message);

    }
  }

  return(
    <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-2xl font-bold mb-4"> Web Scraper</h1>
    <textarea className="w-full h-32 p-2 border rounded" placeholder="Enter one URL per line" value={urls} onChange={(e) => setUrls(e.target.value)}/>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleScrape}>
        Scrape
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold"> Results:</h2>
        {result.map((r,i) => (
          <div className="mt-4 p-4 bg-white rounded shadow" key={i}>
            <p><strong>Name:</strong>{r.name}</p>
            <p><strong>Website:</strong>{r.website}</p>
           <p><strong>Emails:</strong> {r.contact?.emails?.join(", ") || "Not found"}</p>
          <p><strong>Phones:</strong> {r.contact?.phones?.join(", ") || "Not found"}</p>
          <p><strong>Address:</strong> {r.contact?.address?.join(", ") || "Not found"}</p>

          <p><strong>Social Links:</strong></p>
          <ul className="list-disc list-inside">
            {Object.entries(r.contact?.socialMedia || {}).map(([platform, links]) =>
              links.map((link, i) => (
                <li key={platform + i}>
                  <a className="text-blue-600 underline" href={link} target="_blank" rel="noreferrer">
                    {platform}: {link}
                  </a>
                </li>
              ))
            )}
          </ul>


          </div>
  
        ))}

      </div>
    </div>
  )
}

export default App;