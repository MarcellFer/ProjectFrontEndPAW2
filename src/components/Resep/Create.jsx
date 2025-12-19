import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateResep() {
  const [kategoriMakanan, setKategoriMakanan] = useState([]);
  const [asalMakanan, setAsalMakanan] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    kategoriId: "",
    asalId: "",
    deskripsi: "",
    bahan: [""],
    langkah: [""],
    waktuMemasak: "",
    porsi: "",
    tingkatKesulitan: "sedang",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [kategoriRes, asalRes] = await Promise.all([
          axios.get("https://project-apipaw-2.vercel.app/api/kategoriMakanan"),
          axios.get("https://project-apipaw-2.vercel.app/api/asalMakanan"),
        ]);
        setKategoriMakanan(kategoriRes.data);
        setAsalMakanan(asalRes.data);
      } catch (err) {
        console.error("Error fetching dropdown data:", err);
      }
    };

    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (e, index, fieldName) => {
    const newArray = [...formData[fieldName]];
    newArray[index] = e.target.value;
    setFormData({
      ...formData,
      [fieldName]: newArray,
    });
  };

  const addArrayItem = (fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: [...formData[fieldName], ""],
    });
  };

  const removeArrayItem = (index, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: formData[fieldName].filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nama ||
      !formData.kategoriId ||
      !formData.asalId ||
      !formData.waktuMemasak ||
      !formData.porsi ||
      formData.bahan.filter((b) => b.trim()).length === 0 ||
      formData.langkah.filter((l) => l.trim()).length === 0
    ) {
      setError("Semua field harus diisi!");
      return;
    }

    setError(null);
    setLoading(true);

    const submitData = {
      ...formData,
      bahan: formData.bahan.filter((b) => b.trim()),
      langkah: formData.langkah.filter((l) => l.trim()),
      waktuMemasak: parseInt(formData.waktuMemasak),
      porsi: parseInt(formData.porsi),
    };

    try {
      await axios.post(
        "https://project-apipaw-2.vercel.app/api/resep",
        submitData
      );

      alert("Data berhasil disimpan!");
      navigate("/resep");
    } catch (err) {
      console.error("Error creating resep:", err);
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
      <h2 className="mb-4">Tambah Resep</h2>

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
                Nama Resep *
              </label>
              <input
                type="text"
                className="form-control"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Masukkan nama resep"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="deskripsi" className="form-label">
                Deskripsi
              </label>
              <input
                type="text"
                className="form-control"
                id="deskripsi"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                placeholder="Masukkan deskripsi"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="kategoriId" className="form-label">
                Kategori Makanan *
              </label>
              <select
                className="form-control"
                id="kategoriId"
                name="kategoriId"
                value={formData.kategoriId}
                onChange={handleChange}
              >
                <option value="">Pilih Kategori</option>
                {kategoriMakanan.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.nama}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="asalId" className="form-label">
                Asal Makanan *
              </label>
              <select
                className="form-control"
                id="asalId"
                name="asalId"
                value={formData.asalId}
                onChange={handleChange}
              >
                <option value="">Pilih Asal</option>
                {asalMakanan.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.nama}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="tingkatKesulitan" className="form-label">
                Tingkat Kesulitan
              </label>
              <select
                className="form-control"
                id="tingkatKesulitan"
                name="tingkatKesulitan"
                value={formData.tingkatKesulitan}
                onChange={handleChange}
              >
                <option value="mudah">Mudah</option>
                <option value="sedang">Sedang</option>
                <option value="sulit">Sulit</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="waktuMemasak" className="form-label">
                Waktu Memasak (menit) *
              </label>
              <input
                type="number"
                className="form-control"
                id="waktuMemasak"
                name="waktuMemasak"
                value={formData.waktuMemasak}
                onChange={handleChange}
                placeholder="Masukkan waktu memasak"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="porsi" className="form-label">
                Jumlah Porsi *
              </label>
              <input
                type="number"
                className="form-control"
                id="porsi"
                name="porsi"
                value={formData.porsi}
                onChange={handleChange}
                placeholder="Masukkan jumlah porsi"
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Bahan-Bahan *</label>
          {formData.bahan.map((bahan, index) => (
            <div key={index} className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={bahan}
                onChange={(e) => handleArrayChange(e, index, "bahan")}
                placeholder={`Bahan ${index + 1}`}
              />
              {formData.bahan.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeArrayItem(index, "bahan")}
                >
                  Hapus
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => addArrayItem("bahan")}
          >
            + Tambah Bahan
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Langkah-Langkah *</label>
          {formData.langkah.map((langkah, index) => (
            <div key={index} className="input-group mb-2">
              <span className="input-group-text">{index + 1}.</span>
              <input
                type="text"
                className="form-control"
                value={langkah}
                onChange={(e) => handleArrayChange(e, index, "langkah")}
                placeholder={`Langkah ${index + 1}`}
              />
              {formData.langkah.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeArrayItem(index, "langkah")}
                >
                  Hapus
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => addArrayItem("langkah")}
          >
            + Tambah Langkah
          </button>
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
