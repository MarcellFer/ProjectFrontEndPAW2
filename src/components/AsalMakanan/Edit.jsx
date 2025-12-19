import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAsalMakanan() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nama: "",
    kodeNegara: "",
    bendera: "",
    deskripsi: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAsalMakanan = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://project-apipaw-2.vercel.app/api/asalMakanan/${id}`
        );
        setFormData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching asal makanan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAsalMakanan();
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
      setError("Nama asal makanan harus diisi!");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      await axios.put(
        `https://project-apipaw-2.vercel.app/api/asalMakanan/${id}`,
        formData
      );

      alert("Data berhasil diperbarui!");
      navigate("/asalMakanan");
    } catch (err) {
      console.error("Error updating asal makanan:", err);
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
      <h2 className="mb-4">Edit Asal Makanan</h2>

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
          <label htmlFor="bendera" className="form-label">
            Bendera Emoji
          </label>
          <input
            type="text"
            className="form-control"
            id="bendera"
            name="bendera"
            value={formData.bendera}
            onChange={handleChange}
            placeholder="Contoh: 🇮🇩, 🇲🇾"
            maxLength="2"
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
            placeholder="Masukkan deskripsi asal makanan/negara"
            rows="4"
          ></textarea>
        </div>

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "Menyimpan..." : "Simpan"}
          </button>
          <button type="reset" className="btn btn-secondary">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
