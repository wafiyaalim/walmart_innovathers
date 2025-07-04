import React, { useState } from "react";
import axios from "axios";

function UploadInvoice() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const handleUpload = () => {
    if (!file) return setMsg("Please select a file");

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const invoice = JSON.parse(e.target.result);
        await axios.post("http://localhost:5000/validate-invoice", invoice);
        setMsg("Invoice validated ✅");
      } catch (err) {
        setMsg("Validation failed ❌");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="mb-3">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button className="btn btn-primary ml-2" onClick={handleUpload}>
        Validate
      </button>
      <p>{msg}</p>
    </div>
  );
}

export default UploadInvoice;