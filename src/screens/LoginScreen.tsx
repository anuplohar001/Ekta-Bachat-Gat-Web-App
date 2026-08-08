import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Phone } from 'react-feather';
import colors from '../constants/colors';
import { groupInfo } from '../constants/mockData';
import { useAuth } from '../hooks/useAuth';
import { toErrorMessage } from '../utils/errorMessages';
import styles from './LoginScreen.module.css';
import logo from '../../public/logo.png';
import Loader from '../components/Loader';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoginError(null);
    if (!mobile || !password) {
      setLoginError('कृपया मोबाईल नंबर आणि पासवर्ड टाका.');
      return;
    }
    try {
      await login(mobile, password);
      navigate('/');
    } catch (err) {
      setLoginError(error ?? toErrorMessage(err));
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <div className={styles.orgInfo}>
          <h1 className={styles.name}>{groupInfo.name}</h1>
          <span className={styles.address}>{groupInfo.bank}, खाते क्र.: {groupInfo.account}</span>
          <span className={styles.address}>{groupInfo.address}</span>
          <span className={styles.address}>ईमेल : {groupInfo.email}</span>
          <span className={styles.sub}>स्थापना दि. : {groupInfo.established}</span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>लॉगिन</div>
        {loading && <Loader/>}

        <div className={styles.inputWrap}>
          <span className={styles.inputIcon}>
            <Phone size={18} color={colors.textMuted} />
          </span>
          <input
            className={styles.fieldInput}
            type="tel"
            inputMode="numeric"
            placeholder="मोबाईल नंबर"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <div className={styles.inputWrap}>
          <span className={styles.inputIcon}>
            <Lock size={18} color={colors.textMuted} />
          </span>
          <input
            className={styles.fieldInput}
            type="password"
            placeholder="पासवर्ड"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {loginError && (
          <p style={{ color: colors.redInk, fontSize: 13, margin: '0 0 8px', textAlign: 'center' }}>
            {loginError}
          </p>
        )}

        <button
          type="button"
          className={styles.loginBtn}
          onClick={handleLogin}
          disabled={loading}
          style={loading ? { opacity: 0.7 } : undefined}
        >
          {loading ? 'लॉगिन होत आहे…' : 'लॉगिन करा'}
        </button>
      </div>
    </div>
  );
}
