import { useState } from 'react';

export default function FeedbackForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Nama wajib diisi';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email tidak valid';
    if (!form.message) newErrors.message = 'Pesan wajib diisi';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div>
        <h2>Terima kasih atas feedbacknya!</h2>
        <p><strong>Nama:</strong> {form.name}</p>
        <p><strong>Email:</strong> {form.email}</p>
        <p><strong>Pesan:</strong> {form.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Nama:</label><br />
        <input id="name" name="name" value={form.name} onChange={handleChange} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor='email'>Email:</label><br />
        <input id="email" name="email" value={form.email} onChange={handleChange} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor='pesan'>Pesan:</label><br />
        <textarea id="pesan" name="message" value={form.message} onChange={handleChange} />
        {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
      </div>

      <button type="submit">Kirim</button>
    </form>
  );
}
