import React, { useState } from "react";

const Table = ({ columns, data }) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [order, setOrder] = useState("asc");

  // Filter
  const filteredData = data.filter((row) =>
    columns.some((col) =>
      String(row[col]).toLowerCase().includes(search.toLowerCase())
    )
  );

  // Sort
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    if (order === "asc") {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    } else {
      return a[sortKey] < b[sortKey] ? 1 : -1;
    }
  });

  const handleSort = (col) => {
    setSortKey(col);
    setOrder(order === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <input
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} onClick={() => handleSort(col)}>
                {col} 🔽
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sortedData.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col}>{row[col]}</td>
              ))}
              <td>
                {row.deleted_at ? (
                  <span style={{ color: "red" }}>Deleted</span>
                ) : (
                  <span style={{ color: "green" }}>Active</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;