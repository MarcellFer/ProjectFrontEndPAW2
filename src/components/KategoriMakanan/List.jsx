import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function KategoriMakananList() {
  const [kategoriMakanan, setKategoriMakanan] = useState([]);
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
          .delete(`https://project-apipaw-2.vercel.app/api/kategoriMakanan/${id}`)
          .then(() => {
            setKategoriMakanan(kategoriMakanan.filter((k) => k._id !== id));
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
    const fetchKategoriMakanan = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://project-apipaw-2.vercel.app/api/kategoriMakanan"
        );
        setKategoriMakanan(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching kategori makanan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchKategoriMakanan();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-fluid mt-5">
      <h1 className="mb-4">Kategori Makanan List</h1>
      <NavLink to="/kategoriMakanan/create" className="btn btn-primary mb-3">
        + Tambah Kategori Makanan
      </NavLink>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "20%" }}>Nama Kategori</th>
              <th style={{ width: "60%" }}>Deskripsi</th>
              <th style={{ width: "20%" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kategoriMakanan.map((item) => (
              <tr key={item._id}>
                <td className="fw-semibold">{item.nama}</td>
                <td className="small">
                  {item.deskripsi ? item.deskripsi.substring(0, 80) + "..." : "-"}
                </td>
                <td>
                  <NavLink
                    to={`/kategoriMakanan/edit/${item._id}`}
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
      {kategoriMakanan.length === 0 && (
        <div className="alert alert-info text-center mt-4">
          Belum ada data kategori makanan. <NavLink to="/kategoriMakanan/create">Tambah kategori makanan baru</NavLink>
        </div>
      )}
    </div>
  );
}
