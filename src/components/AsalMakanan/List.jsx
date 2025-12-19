import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function AsalMakananList() {
  const [asalMakanan, setAsalMakanan] = useState([]);
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
          .delete(`https://project-apipaw-2.vercel.app/api/asalMakanan/${id}`)
          .then(() => {
            setAsalMakanan(asalMakanan.filter((a) => a._id !== id));
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
    const fetchAsalMakanan = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://project-apipaw-2.vercel.app/api/asalMakanan"
        );
        setAsalMakanan(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching asal makanan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAsalMakanan();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-fluid mt-5">
      <h1 className="mb-4">Asal Makanan List</h1>
      <NavLink to="/asalMakanan/create" className="btn btn-primary mb-3">
        + Tambah Asal Makanan
      </NavLink>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "20%" }}>Nama Negara</th>
              <th style={{ width: "12%" }}>Kode Negara</th>
              <th style={{ width: "43%" }}>Deskripsi</th>
              <th style={{ width: "20%" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {asalMakanan.map((item) => (
              <tr key={item._id}>
                <td className="fw-semibold">{item.nama}</td>
                <td className="text-center">
                  <span className="badge bg-primary">{item.kodeNegara || "-"}</span>
                </td>
                <td className="small">
                  {item.deskripsi ? item.deskripsi.substring(0, 60) + "..." : "-"}
                </td>
                <td>
                  <NavLink
                    to={`/asalMakanan/edit/${item._id}`}
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
      {asalMakanan.length === 0 && (
        <div className="alert alert-info text-center mt-4">
          Belum ada data asal makanan. <NavLink to="/asalMakanan/create">Tambah asal makanan baru</NavLink>
        </div>
      )}
    </div>
  );
}
