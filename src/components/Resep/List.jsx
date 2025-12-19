import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function ResepList() {
  const [resep, setResep] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Are you sure wanna delete " + nama + "?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://project-apipaw-2.vercel.app/api/resep/${id}`)
          .then(() => {
            setResep(resep.filter((r) => r._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire(
              "Error",
              "There was an issue deleting the data.",
              "error"
            );
          });
      }
    });
  };

  useEffect(() => {
    const fetchResep = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://project-apipaw-2.vercel.app/api/resep"
        );
        setResep(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching resep:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResep();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-fluid mt-5">
      <h1 className="mb-4">Resep List</h1>
      <NavLink to="/resep/create" className="btn btn-primary mb-3">
        + Tambah Resep
      </NavLink>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "15%" }}>Nama Resep</th>
              <th style={{ width: "10%" }}>Kategori</th>
              <th style={{ width: "10%" }}>Asal</th>
              <th style={{ width: "25%" }}>Deskripsi</th>
              <th style={{ width: "8%" }}>Waktu (menit)</th>
              <th style={{ width: "8%" }}>Porsi</th>
              <th style={{ width: "10%" }}>Kesulitan</th>
              <th style={{ width: "14%" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {resep.map((item) => (
              <tr key={item._id}>
                <td className="fw-semibold">{item.nama}</td>
                <td>
                  <span className="badge bg-info">
                    {item.kategoriId?.nama || "-"}
                  </span>
                </td>
                <td>
                  <span className="badge bg-secondary">
                    {item.asalId?.nama || "-"}
                  </span>
                </td>
                <td className="small">
                  {item.deskripsi ? item.deskripsi.substring(0, 40) + "..." : "-"}
                </td>
                <td className="text-center">{item.waktuMemasak}</td>
                <td className="text-center">{item.porsi}</td>
                <td className="text-center">
                  <span
                    className={`badge ${
                      item.tingkatKesulitan === "mudah"
                        ? "bg-success"
                        : item.tingkatKesulitan === "sedang"
                        ? "bg-warning"
                        : item.tingkatKesulitan === "sulit"
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                  >
                    {item.tingkatKesulitan}
                  </span>
                </td>
                <td>
                  <NavLink
                    to={`/resep/edit/${item._id}`}
                    className="btn btn-warning btn-sm me-2"
                    title="Edit"
                  >
                    ✎ Edit
                  </NavLink>
                  <button
                    onClick={() => handleDelete(item._id, item.nama)}
                    className="btn btn-danger btn-sm"
                    title="Delete"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {resep.length === 0 && (
        <div className="alert alert-info text-center mt-4">
          Belum ada data resep. <NavLink to="/resep/create">Tambah resep baru</NavLink>
        </div>
      )}
    </div>
  );
}
