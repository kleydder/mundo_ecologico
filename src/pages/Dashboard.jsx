import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, LogOut, FileText, Download, CheckCircle, Clock, Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import { getCertificatesByClient } from '../services/db';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('comercializacion');
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    if (user) {
      setCertificates(getCertificatesByClient(user.username));
    }
  }, [user]);

  const filteredCertificates = certificates.filter(c => c.category === activeTab);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-light)' }}>
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="mobile-only"
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 40 }}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} style={{
        width: '280px',
        backgroundColor: 'white',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 10
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
          <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {user?.photoUrl && (
              <img src={user.photoUrl} alt="Logo Empresa" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
            )}
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>
                Bienvenido
              </p>
              <p style={{ fontWeight: '700', color: 'var(--text-dark)', fontSize: '1.1rem', lineHeight: '1.2' }}>
                {user?.razonSocial || user?.username}
              </p>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="#" style={{ 
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', 
              backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)', 
              borderRadius: '8px', fontWeight: '600', transition: 'all 0.2s'
            }}>
              <FileText size={20} />
              Mis Certificados
            </a>
            {/* Additional mock menu items could go here */}
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
            onMouseOver={e => { e.currentTarget.style.backgroundColor = '#fee2e2'; e.currentTarget.style.color = '#dc2626'; }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-gray)'; }}
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ flex: 1, padding: '3rem' }}>
        <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="mobile-only" onClick={() => setSidebarOpen(true)} style={{ marginTop: '0.25rem', color: 'var(--text-dark)' }}>
              <Menu size={28} />
            </button>
            <div>
              <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: '800', color: 'var(--text-dark)', margin: 0, letterSpacing: '-0.5px' }}>
                Historial de Certificados
              </h1>
              <p style={{ color: 'var(--text-gray)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                Consulta y descarga la documentación legal.
              </p>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', overflowX: 'auto' }}>
          <button 
            onClick={() => setActiveTab('comercializacion')}
            style={{ padding: '0.75rem 1rem', fontWeight: '600', color: activeTab === 'comercializacion' ? 'var(--primary-dark)' : 'var(--text-gray)', borderBottom: activeTab === 'comercializacion' ? '2px solid var(--primary-dark)' : '2px solid transparent', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
            Certificado de Comercialización
          </button>
          <button 
            onClick={() => setActiveTab('no_aprovechable')}
            style={{ padding: '0.75rem 1rem', fontWeight: '600', color: activeTab === 'no_aprovechable' ? 'var(--primary-dark)' : 'var(--text-gray)', borderBottom: activeTab === 'no_aprovechable' ? '2px solid var(--primary-dark)' : '2px solid transparent', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
            No Aprovechable
          </button>
          <button 
            onClick={() => setActiveTab('aguas_residuales')}
            style={{ padding: '0.75rem 1rem', fontWeight: '600', color: activeTab === 'aguas_residuales' ? 'var(--primary-dark)' : 'var(--text-gray)', borderBottom: activeTab === 'aguas_residuales' ? '2px solid var(--primary-dark)' : '2px solid transparent', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
            Aguas Residuales
          </button>
        </div>

        {/* Table Container */}
        <div style={{ 
          backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          border: '1px solid var(--border-color)', width: '100%'
        }} className="animate-fade-in">
          
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ minWidth: '800px', width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ID Certificado</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fecha de Recojo</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tipo de Residuo</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Estado</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredCertificates.length > 0 ? filteredCertificates.map((cert, index) => (
                <tr key={index} style={{ borderBottom: index < certificates.length - 1 ? '1px solid var(--border-color)' : 'none', transition: 'background-color 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: 'var(--text-dark)' }}>{cert.id}</td>
                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-gray)' }}>{cert.date}</td>
                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-gray)' }}>{cert.type}</td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    {cert.status === 'disponible' ? (
                      <span style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: '0.375rem', 
                        padding: '0.25rem 0.75rem', backgroundColor: 'var(--primary-light)', 
                        color: 'var(--primary-dark)', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600'
                      }}>
                        <CheckCircle size={14} />
                        Disponible
                      </span>
                    ) : (
                      <span style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: '0.375rem', 
                        padding: '0.25rem 0.75rem', backgroundColor: '#f3f4f6', 
                        color: 'var(--text-gray)', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600'
                      }}>
                        <Clock size={14} />
                        Pendiente
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                    {cert.status === 'disponible' ? (
                      <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Download size={16} /> PDF
                      </button>
                    ) : (
                      <button disabled style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f3f4f6', color: '#9ca3af', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'not-allowed' }}>
                        <Download size={16} /> Doc
                      </button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-gray)' }}>
                    No se encontraron certificados en esta categoría.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
          
          {/* Pagination / Footer dummy */}
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-light)', fontSize: '0.875rem' }}>
            <span>Mostrando {filteredCertificates.length} resultados</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'white', color: 'var(--text-gray)' }}>Anterior</button>
              <button style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'white', color: 'var(--text-gray)' }}>Siguiente</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
