import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditKategoriMakanan() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKategoriMakanan = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://project-apipaw-2.vercel.app/api/kategoriMakanan/${id}`
        );
        setFormData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching kategori makanan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchKategoriMakanan();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nama) {
      setError("Nama kategori makanan harus diisi!");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      await axios.put(
        `https://project-apipaw-2.vercel.app/api/kategoriMakanan/${id}`,
        formData
      );

      alert("Data berhasil diperbarui!");
      navigate("/kategoriMakanan");
    } catch (err) {
      console.error("Error updating kategori makanan:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat mengubah data"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Kategori Makanan</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Kategori
          </label>
          <input
            type="text"
            className="form-control"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Masukkan nama kategori makanan"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="deskripsi" className="form-label">
            Deskripsi
          </label>
          <textarea
            className="form-control"
            id="deskripsi"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            placeholder="Masukkan deskripsi kategori makanan"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
