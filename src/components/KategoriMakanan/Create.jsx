import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateKategoriMakanan() {
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    setLoading(true);

    try {
      await axios.post(
        "https://project-apipaw-2.vercel.app/api/kategoriMakanan",
        formData
      );

      alert("Data berhasil disimpan!");
      navigate("/kategoriMakanan");
    } catch (err) {
      console.error("Error creating kategori makanan:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat menyimpan data"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tambah Kategori Makanan</h2>

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
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
