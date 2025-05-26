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

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        setFormData({
          childName: '',
          age: '',
          parentName: '',
          email: '',
        });
        navigate('/thank-you');
      } else {
        console.error('Registration failed');
        alert('There was a problem submitting the form. Please try again.');
      }
    } catch (error) {
      console.error('Error connecting to backend:', error);
      alert('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  return (
 <div className={styles.pageWrapper}>
<div className={styles.container}>
  <h1 className={styles.title}>Speech Camp Registration</h1>

  <div className={styles.infoSection}>
    <div className={styles.infoBox}>
      <h2>What’s Included</h2>
      <ul>
        <li>✔ Daily small-group therapy with a licensed SLP</li>
        <li>✔ All materials and themed activities</li>
        <li>✔ Individualized feedback and carryover support</li>
        <li>✔ End-of-week progress note and parent recommendations</li>
      </ul>
    </div>

    <div className={styles.infoBox}>
      <h2>Registration Info</h2>
      <ul>
        <li>💲 Cost: <strong>$375 per child</strong></li>
        <li>🗓 Register by: <strong>June 1st, 2025</strong></li>
        <li>📝 To register: fill out the form below and complete payment via <a href="https://square.link/your-link" target="_blank" rel="noopener noreferrer">Square</a></li>
      </ul>
      <p className={styles.limitedSpots}>Limited spots available — secure your child’s place today!</p>
    </div>
  </div>

  {loading && <div className={styles.spinner}></div>}

  <form onSubmit={handleSubmit} className={`${styles.form} ${loading ? styles.loading : ''}`}>
    <label>
      Child&apos;s Name:
      <input type="text" name="childName" value={formData.childName} onChange={handleChange} placeholder="e.g., Emma Johnson" required />
    </label>
    <label>
      Age:
      <input type="number" name="age" onChange={handleChange} placeholder="# 2-5" required />
    </label>
    <label>
      Parent Name:
      <input type="text" name="parentName" onChange={handleChange} placeholder="Parent Name" required />
    </label>
    <label>
      Email:
      <input type="email" name="email" onChange={handleChange} placeholder="e.g., parent@gmail.com" required />
    </label>
    <button type="submit" disabled={loading}>
      {loading ? 'Submitting...' : 'Register'}
    </button>
  </form>
</div>
</div>
  );
}

export default RegistrationForm;
