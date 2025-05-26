import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/RegistrationForm.module.css';
import empower from '../assets/asset/empower.png';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    childName: '',
    age: '',
    parentName: '',
    email: '',
    goals: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.childName.trim()) {
      newErrors.childName = 'Child name is required.';
    }

    const age = parseInt(formData.age, 10);
    if (!formData.age || isNaN(age) || age < 3 || age > 15) {
      newErrors.age = 'Age must be a number between 3 and 15.';
    }

    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!formData.goals.trim()) {
      newErrors.goals = 'Speech/language goals or concerns is required'
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

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
        setErrors({});
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
        <img src={empower} className={styles.logo} />
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
            <h2>Sounds of Summer Articulation Camp Registration Info</h2>
            <h3>Small Group Speech Therapy hosted by Empower Speech Pathology Solutions at Rio Vista Recreation Center (West Brook Room) Tuesday-Friday.</h3>
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
            <input
              type="text"
              name="childName"
              value={formData.childName}
              onChange={handleChange}
              placeholder="e.g., Emma Johnson"
              required
            />
            {errors.childName && <p className={styles.error}>{errors.childName}</p>}
          </label>

          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="3–15"
              required
            />
            {errors.age && <p className={styles.error}>{errors.age}</p>}
          </label>

          <label>
            Parent Name:
            <input
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              placeholder="Parent Name"
              required
            />
            {errors.parentName && <p className={styles.error}>{errors.parentName}</p>}
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., parent@gmail.com"
              required
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </label>

          <label>
            Speech/Language Goals or Concerns:
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              placeholder="Describe any concerns or goals"
              rows={4}
              required
              className={styles.input}
              />
              {errors.goals && <p className={styles.error}>{errors.goals}</p>}
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
