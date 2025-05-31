// src/_tests_/FeedbackForm.test.jsx
import { describe, it, expect } from 'vitest';
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

  it('menampilkan pesan sukses setelah submit valid', () => {
    render(<FeedbackForm />);
    fireEvent.change(screen.getByLabelText(/nama/i), { target: { value: 'Dhimas' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'dhimas@example.com' } });
    fireEvent.change(screen.getByLabelText(/pesan/i), { target: { value: 'Tes pesan' } });
    fireEvent.click(screen.getByText(/kirim/i));

    expect(screen.getByText(/terima kasih/i)).toBeInTheDocument();
    expect(screen.getByText(/Dhimas/i)).toBeInTheDocument();
    expect(screen.getByText(/dhimas@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Tes pesan/i)).toBeInTheDocument();
  });
});
