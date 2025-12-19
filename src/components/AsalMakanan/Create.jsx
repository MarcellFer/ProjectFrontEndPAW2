import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateAsalMakanan() {
  const [formData, setFormData] = useState({
    nama: "",
    kodeNegara: "",
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
      setError("Nama asal makanan harus diisi!");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await axios.post(
        "https://project-apipaw-2.vercel.app/api/asalMakanan",
        formData
      );

      alert("Data berhasil disimpan!");
      navigate("/asalMakanan");
    } catch (err) {
      console.error("Error creating asal makanan:", err);
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
      <h2 className="mb-4">Tambah Asal Makanan</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="nama" className="form-label">
                Nama Negara *
              </label>
              <input
                type="text"
                className="form-control"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Contoh: Indonesia, Malaysia"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="kodeNegara" className="form-label">
                Kode Negara (ISO)
              </label>
              <input
                type="text"
                className="form-control"
                id="kodeNegara"
                name="kodeNegara"
                value={formData.kodeNegara}
                onChange={handleChange}
                placeholder="Contoh: ID, MY, SG"
                maxLength="2"
              />
            </div>
          </div>
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
            placeholder="Masukkan deskripsi asal makanan/negara"
            rows="4"
          ></textarea>
        </div>

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button type="reset" className="btn btn-secondary">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
