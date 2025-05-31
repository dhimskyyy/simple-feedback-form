import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import FeedbackForm from '../components/FeedbackForm';

describe('FeedbackForm', () => {
  afterEach(cleanup);

  it('menampilkan error saat field kosong', async () => {
    render(<FeedbackForm />);
    fireEvent.click(screen.getByTestId('submit-button'));

    expect(await screen.findByText(/nama wajib diisi/i)).toBeInTheDocument();
    expect(await screen.findByText(/email tidak valid/i)).toBeInTheDocument(); // fix here
    expect(await screen.findByText(/pesan wajib diisi/i)).toBeInTheDocument();
  });

  it('menampilkan pesan sukses setelah submit valid', async () => {
    render(<FeedbackForm />);

    fireEvent.change(screen.getByLabelText(/nama/i), {
      target: { value: 'Dhimas' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'dhimas@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/pesan/i), {
      target: { value: 'Tes pesan' },
    });

    fireEvent.click(screen.getByTestId('submit-button')); // fix here

    // Pesan terima kasih
    expect(await screen.findByText(/terima kasih atas feedbacknya/i)).toBeInTheDocument();

    // Cek Nama
    const nama = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'p' &&
             content.includes('Nama:') &&
             content.includes('Dhimas');
    });
    expect(nama).toBeInTheDocument();

    // Cek Email
    const email = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'p' &&
             content.includes('Email:') &&
             content.includes('dhimas@example.com');
    });
    expect(email).toBeInTheDocument();

    // Cek Pesan
    const pesan = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'p' &&
             content.includes('Pesan:') &&
             content.includes('Tes pesan');
    });
    expect(pesan).toBeInTheDocument();
  });
});