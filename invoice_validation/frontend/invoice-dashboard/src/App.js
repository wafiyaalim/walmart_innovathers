// src/App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [invoice, setInvoice] = useState(null);
  const [validation, setValidation] = useState(null);
  const [error, setError] = useState("");

  const handleValidate = async () => {
    console.log("🔄 Validate button clicked");
    console.log("Invoice being sent:", invoice);

    try {
      const response = await axios.post("http://localhost:5000/validate-invoice", invoice);
      console.log("✅ Validation response received:", response.data);
      setValidation(response.data);
      setError("");
    } catch (err) {
      console.error("❌ Validation error:", err);
      setError("Validation failed. Please check the backend.");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/upload-pdf", formData);
      setInvoice(response.data);
      setValidation(null);
      setError("");
    } catch (err) {
      console.error(err);
      setError("PDF upload failed or parsing error.");
    }
  };

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📄 Upload Invoice (PDF)</h2>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />

      {invoice && (
        <>
          <h3 style={{ marginTop: "20px" }}>📦 Parsed Invoice</h3>
          <table border="1" cellPadding="10">
            <tbody>
              {Object.entries(invoice).map(([key, value]) => (
                key !== "raw_text" && (
                  <tr key={key}>
                    <td><b>{key}</b></td>
                    <td>{value}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>

          <button onClick={handleValidate} style={{ padding: "10px 20px", marginTop: "20px" }}>
            ✅ Validate Invoice
          </button>
        </>
      )}

      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}

      {validation && (
        <div style={{ marginTop: "25px", textAlign: "left" }}>
          <h3>🔍 Validation Result</h3>

          <h4 style={{ color: validation.status === "cleared" ? "green" : "red" }}>
            {validation.status === "cleared"
              ? "✅ Invoice is Valid"
              : "❌ Invoice is Invalid"}
          </h4>

          <p><strong>Status:</strong> {validation.status}</p>
          <p><strong>ML Anomaly Flag:</strong> {validation.ml_validation.anomaly_flag ? "❌ Yes" : "✅ No"}</p>
          <p><strong>Anomaly Score:</strong> {validation.ml_validation.anomaly_score.toFixed(2)}</p>
          <p><strong>Explanation:</strong> {validation.ml_validation.explanation}</p>

          {validation.rule_violations.length > 0 ? (
            <>
              <p><strong>Rule Violations:</strong></p>
              <ul>
                {validation.rule_violations.map((violation, index) => (
                  <li key={index} style={{ color: "red" }}>{violation}</li>
                ))}
              </ul>
            </>
          ) : (
            <p><strong>Rule Violations:</strong> ✅ None</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;