import { render, screen, fireEvent } from '@testing-library/react';
import FeedbackForm from '../components/FeedbackForm';

describe('FeedbackForm', () => {
  it('menampilkan error saat field kosong', () => {
    render(<FeedbackForm />);
    fireEvent.click(screen.getByText(/kirim/i));
    expect(screen.getByText(/nama wajib diisi/i)).toBeInTheDocument();
    expect(screen.getByText(/email tidak valid/i)).toBeInTheDocument();
    expect(screen.getByText(/pesan wajib diisi/i)).toBeInTheDocument();
  });

  it('menampilkan hasil setelah submit valid', () => {
    render(<FeedbackForm />);
    fireEvent.change(screen.getByLabelText(/nama/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/pesan/i), { target: { value: 'Halo dunia' } });
    fireEvent.click(screen.getByText(/kirim/i));

    expect(screen.getByText(/terima kasih/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
  });
});
