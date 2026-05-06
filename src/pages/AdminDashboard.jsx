import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, LogOut, Upload, FileText, CheckCircle, Clock, Building, Plus } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import { getAllCertificates, addCertificate } from '../services/db';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState(getAllCertificates());
  
  // Form State
  const [clientId, setClientId] = useState('');
  const [certType, setCertType] = useState('Residuos Orgánicos');
  const [category, setCategory] = useState('comercializacion');
  const [status, setStatus] = useState('disponible');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddCertificate = (e) => {
    e.preventDefault();
    if (!clientId) return;

    const newCert = addCertificate({
      type: certType,
      status: status,
      category: category,
      clientId: clientId
    });

    setCertificates([newCert, ...certificates]);
    setClientId('');
    alert('Certificado asignado correctamente al cliente ' + clientId);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-light)' }}>
      {/* Sidebar */}
      <aside className="sidebar open" style={{
        backgroundColor: 'white', borderRight: '1px solid var(--border-color)', display: 'flex',
        flexDirection: 'column', position: 'fixed', height: '100vh', zIndex: 10
      }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-dark)' }}>
            <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={logoImg} alt="Mundo Ecológico" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.5px' }}>Mundo Ecológico</span>
          </Link>
        </div>

        <div style={{ padding: '2rem 1.5rem', flex: 1 }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>
              Panel de Control
            </p>
            <p style={{ fontWeight: '700', color: 'var(--primary-dark)', fontSize: '1.1rem' }}>
              Administrador
            </p>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="#" style={{ 
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', 
              backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)', 
              borderRadius: '8px', fontWeight: '600', transition: 'all 0.2s'
            }}>
              <Upload size={20} />
              Gestión de Certificados
            </a>
          </nav>
        </div>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', 
              padding: '0.875rem 1rem', borderRadius: '8px', color: 'var(--text-gray)',
              fontWeight: '500', transition: 'all 0.2s', textAlign: 'left'
            }}
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ flex: 1, padding: '3rem' }}>
        <header style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: '800', color: 'var(--text-dark)', margin: 0, letterSpacing: '-0.5px' }}>
            Administración de Certificados
          </h1>
          <p style={{ color: 'var(--text-gray)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Sube y asigna certificados a los clientes.
          </p>
        </header>

        {/* Upload Form */}
        <div style={{ 
          backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          border: '1px solid var(--border-color)', width: '100%', padding: '2rem', marginBottom: '2rem'
        }} className="animate-fade-in">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={20} color="var(--primary)" />
            Nuevo Certificado
          </h2>
          
          <form onSubmit={handleAddCertificate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>ID del Cliente (RUC)</label>
              <input 
                type="text" required value={clientId} onChange={e => setClientId(e.target.value)}
                placeholder="Ej. CLIENTE-001"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Categoría</label>
              <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}>
                <option value="comercializacion">Comercialización</option>
                <option value="no_aprovechable">No Aprovechable</option>
                <option value="aguas_residuales">Aguas Residuales</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Descripción / Tipo</label>
              <input 
                type="text" required value={certType} onChange={e => setCertType(e.target.value)}
                placeholder="Ej. Residuos Orgánicos"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Estado</label>
              <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}>
                <option value="disponible">Disponible (PDF Listo)</option>
                <option value="pendiente">Pendiente</option>
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Upload size={18} /> Subir Certificado
              </button>
            </div>

          </form>
        </div>

        {/* Global Certificates Table */}
        <div style={{ 
          backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          border: '1px solid var(--border-color)', width: '100%'
        }} className="animate-fade-in">
          
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>Todos los Certificados</h2>
          </div>

          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ minWidth: '800px', width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-gray)', textTransform: 'uppercase' }}>ID Cert.</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Cliente</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Fecha</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Tipo</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {certificates.length > 0 ? certificates.map((cert, index) => (
                <tr key={index} style={{ borderBottom: index < certificates.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: 'var(--text-dark)' }}>{cert.id}</td>
                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--primary-dark)', fontWeight: '600' }}>{cert.clientId}</td>
                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-gray)' }}>{cert.date}</td>
                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-gray)' }}>{cert.type} ({cert.category})</td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    {cert.status === 'disponible' ? (
                      <span style={{ padding: '0.25rem 0.75rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600' }}>
                        Disponible
                      </span>
                    ) : (
                      <span style={{ padding: '0.25rem 0.75rem', backgroundColor: '#f3f4f6', color: 'var(--text-gray)', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600' }}>
                        Pendiente
                      </span>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-gray)' }}>No hay certificados.</td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
