import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const InvoiceTable = () => {
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/sample-invoice")
      .then(res => res.json())
      .then(data => setInvoiceData(data))
      .catch(err => console.error("Error fetching invoice:", err));
  }, []);

  if (!invoiceData) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h3>Sample Invoice Data</h3>
      <Table striped bordered hover>
        <tbody>
          {Object.entries(invoiceData).map(([key, value]) => (
            <tr key={key}>
              <th>{key}</th>
              <td>{JSON.stringify(value)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default InvoiceTable;