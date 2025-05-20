import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/RegistrationForm.module.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    childName: '',
    age: '',
    parentName: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://speech-backend-8gjb.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Registration successful!');
        navigate('/thank-you');
      } else {
        console.error('Registration failed');
        alert('There was a problem submitting the form. Please try again.');
      }
    } catch (error) {
      console.error('Error connecting to backend:', error);
      alert('Server error. Please try again later.');
    }
  };


  return (
    <div className={styles.container}>
      <h1>Speech Camp Registration</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Child&apos;s Name:
          <input type="text" name="childName" onChange={handleChange} required />
        </label>
        <label>
          Age:
          <input type="number" name="age" onChange={handleChange} required />
        </label>
        <label>
          Parent Name:
          <input type="text" name="parentName" onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" onChange={handleChange} required />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
