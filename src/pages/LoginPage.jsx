import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, ArrowRight, Lock, Building } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [companyId, setCompanyId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(companyId, password)) {
      const user = JSON.parse(sessionStorage.getItem('me_user'));
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(rgba(243, 244, 246, 0.8), rgba(243, 244, 246, 0.9)), url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80") center/cover no-repeat',
      padding: '1.5rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        width: '100%',
        maxWidth: '480px',
        padding: '3rem 2.5rem',
        position: 'relative',
        overflow: 'hidden'
      }} className="animate-fade-in">
        
        {/* Decorative Top Border */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'var(--primary)' }}></div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dark)' }}>
            <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={logoImg} alt="Mundo Ecológico" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>Mundo Ecológico</span>
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
            Acceso a Clientes
          </h1>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>
            Ingresa a tu portal para visualizar y descargar tus certificados de disposición de residuos.
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {error && (
            <div style={{ padding: '0.75rem', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', fontSize: '0.875rem', textAlign: 'center' }}>
              {error}
            </div>
          )}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
              ID de Empresa
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
                <Building size={20} />
              </div>
              <input 
                type="text" 
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                placeholder="Ej. RUC o ID interno"
                required
                style={{
                  width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', borderRadius: '10px',
                  border: '1px solid var(--border-color)', fontSize: '1rem',
                  outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
                  backgroundColor: 'var(--bg-white)'
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(17, 212, 98, 0.1)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
                <Lock size={20} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', borderRadius: '10px',
                  border: '1px solid var(--border-color)', fontSize: '1rem',
                  outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
                  backgroundColor: 'var(--bg-white)'
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(17, 212, 98, 0.1)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a href="#" style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: '600', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--primary-dark)'} onMouseOut={e => e.target.style.color = 'var(--primary)'}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            Ingresar al Portal <ArrowRight size={20} />
          </button>
        </form>

        <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-gray)' }}>
          ¿No tienes una cuenta? <a href="#" style={{ color: 'var(--text-dark)', fontWeight: '600', borderBottom: '1px solid var(--text-dark)' }}>Contáctanos</a> para darte de alta.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
