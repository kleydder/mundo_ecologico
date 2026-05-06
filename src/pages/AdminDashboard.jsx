import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Upload, Users, Plus, Edit } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import { getAllCertificates, addCertificate, getAllUsers, addUser, updateUser } from '../services/db';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('certificates'); // 'certificates' or 'users'
  
  // Data State
  const [certificates, setCertificates] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setCertificates(getAllCertificates());
    setClients(getAllUsers());
  }, []);

  // --- Certificate Form State ---
  const [certClientId, setCertClientId] = useState('');
  const [certType, setCertType] = useState('Residuos Orgánicos');
  const [category, setCategory] = useState('comercializacion');
  const [status, setStatus] = useState('disponible');
  const [certDate, setCertDate] = useState('');

  // --- User Form State ---
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({
    username: '', password: '', ruc: '', razonSocial: '', encargado: '', ubicacion: '', contacto: ''
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddCertificate = (e) => {
    e.preventDefault();
    if (!certClientId || !certDate) return alert('Por favor llena todos los campos');

    const newCert = addCertificate({
      type: certType, status, category, clientId: certClientId, date: certDate
    });

    setCertificates([newCert, ...certificates]);
    setCertClientId(''); setCertDate('');
    alert('Certificado asignado correctamente.');
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (editingUser) {
      const updated = updateUser(editingUser.id, userForm);
      setClients(clients.map(c => c.id === editingUser.id ? updated : c));
      alert('Usuario actualizado');
    } else {
      try {
        const created = addUser(userForm);
        setClients([...clients, created]);
        alert('Usuario creado');
      } catch (err) {
        alert(err.message);
        return;
      }
    }
    setEditingUser(null);
    setUserForm({ username: '', password: '', ruc: '', razonSocial: '', encargado: '', ubicacion: '', contacto: '' });
  };

  const startEditUser = (client) => {
    setEditingUser(client);
    setUserForm({
      username: client.username, password: client.password, ruc: client.ruc,
      razonSocial: client.razonSocial, encargado: client.encargado,
      ubicacion: client.ubicacion, contacto: client.contacto
    });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-light)' }}>
      {/* Sidebar */}
      <aside className="sidebar open" style={{
        backgroundColor: 'white', borderRight: '1px solid var(--border-color)', display: 'flex',
        flexDirection: 'column', position: 'fixed', height: '100vh', zIndex: 10, width: '280px'
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
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>Panel de Control</p>
            <p style={{ fontWeight: '700', color: 'var(--primary-dark)', fontSize: '1.1rem' }}>{user?.username}</p>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button onClick={() => setActiveTab('certificates')} style={{ 
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', 
              backgroundColor: activeTab === 'certificates' ? 'var(--primary-light)' : 'transparent',
              color: activeTab === 'certificates' ? 'var(--primary-dark)' : 'var(--text-gray)', 
              borderRadius: '8px', fontWeight: '600', transition: 'all 0.2s', width: '100%', border: 'none', textAlign: 'left', cursor: 'pointer'
            }}>
              <Upload size={20} /> Certificados
            </button>
            <button onClick={() => setActiveTab('users')} style={{ 
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', 
              backgroundColor: activeTab === 'users' ? 'var(--primary-light)' : 'transparent',
              color: activeTab === 'users' ? 'var(--primary-dark)' : 'var(--text-gray)', 
              borderRadius: '8px', fontWeight: '600', transition: 'all 0.2s', width: '100%', border: 'none', textAlign: 'left', cursor: 'pointer'
            }}>
              <Users size={20} /> Usuarios
            </button>
          </nav>
        </div>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', borderRadius: '8px', color: 'var(--text-gray)', fontWeight: '500', transition: 'all 0.2s', textAlign: 'left', cursor: 'pointer', border: 'none', background: 'transparent' }}>
            <LogOut size={20} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ flex: 1, padding: '3rem', marginLeft: '280px' }}>
        
        {/* ======================= CERTIFICATES TAB ======================= */}
        {activeTab === 'certificates' && (
          <div>
            <header style={{ marginBottom: '2.5rem' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-dark)' }}>Gestión de Certificados</h1>
              <p style={{ color: 'var(--text-gray)' }}>Sube y asigna certificados a los clientes registrados.</p>
            </header>

            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={20} color="var(--primary)" /> Nuevo Certificado</h2>
              <form onSubmit={handleAddCertificate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Cliente Destino</label>
                  <select value={certClientId} onChange={e => setCertClientId(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <option value="">Selecciona un cliente</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.razonSocial} ({c.ruc})</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Fecha de Atención</label>
                  <input type="date" required value={certDate} onChange={e => setCertDate(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Categoría</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <option value="comercializacion">Comercialización</option>
                    <option value="no_aprovechable">No Aprovechable</option>
                    <option value="aguas_residuales">Aguas Residuales</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Descripción / Tipo</label>
                  <input type="text" required value={certType} onChange={e => setCertType(e.target.value)} placeholder="Ej. Residuos Orgánicos" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Estado</label>
                  <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <option value="disponible">Disponible (PDF Listo)</option>
                    <option value="pendiente">Pendiente</option>
                  </select>
                </div>
                <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Upload size={18} /> Subir Certificado</button>
                </div>
              </form>
            </div>
            
            <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Historial Global</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem', color: 'var(--text-gray)' }}>ID Cert.</th>
                    <th style={{ padding: '1rem', color: 'var(--text-gray)' }}>Cliente (ID)</th>
                    <th style={{ padding: '1rem', color: 'var(--text-gray)' }}>Fecha Atención</th>
                    <th style={{ padding: '1rem', color: 'var(--text-gray)' }}>Categoría</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((cert) => {
                    const client = clients.find(c => c.id === cert.clientId);
                    return (
                      <tr key={cert.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '1rem', fontWeight: '600' }}>{cert.id}</td>
                        <td style={{ padding: '1rem' }}>{client ? client.razonSocial : cert.clientId}</td>
                        <td style={{ padding: '1rem' }}>{cert.date}</td>
                        <td style={{ padding: '1rem' }}>{cert.type}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================= USERS TAB ======================= */}
        {activeTab === 'users' && (
          <div>
            <header style={{ marginBottom: '2.5rem' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-dark)' }}>Directorio de Clientes</h1>
              <p style={{ color: 'var(--text-gray)' }}>Crea y administra las cuentas de tus clientes.</p>
            </header>

            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={20} color="var(--primary)" /> {editingUser ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}
              </h2>
              <form onSubmit={handleSaveUser} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Usuario (Login)</label>
                  <input type="text" required value={userForm.username} onChange={e => setUserForm({...userForm, username: e.target.value})} disabled={editingUser} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Contraseña</label>
                  <input type="text" required value={userForm.password} onChange={e => setUserForm({...userForm, password: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>RUC</label>
                  <input type="text" required value={userForm.ruc} onChange={e => setUserForm({...userForm, ruc: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Razón Social</label>
                  <input type="text" required value={userForm.razonSocial} onChange={e => setUserForm({...userForm, razonSocial: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Nombre del Encargado</label>
                  <input type="text" required value={userForm.encargado} onChange={e => setUserForm({...userForm, encargado: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Número de Contacto</label>
                  <input type="text" required value={userForm.contacto} onChange={e => setUserForm({...userForm, contacto: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Ubicación Física</label>
                  <input type="text" required value={userForm.ubicacion} onChange={e => setUserForm({...userForm, ubicacion: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                </div>
                <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  {editingUser && (
                    <button type="button" onClick={() => {setEditingUser(null); setUserForm({ username: '', password: '', ruc: '', razonSocial: '', encargado: '', ubicacion: '', contacto: '' })}} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer', fontWeight: '600' }}>Cancelar</button>
                  )}
                  <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {editingUser ? 'Guardar Cambios' : 'Registrar Cliente'}
                  </button>
                </div>
              </form>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem', color: 'var(--text-gray)' }}>Empresa</th>
                    <th style={{ padding: '1rem', color: 'var(--text-gray)' }}>Login</th>
                    <th style={{ padding: '1rem', color: 'var(--text-gray)' }}>Contacto</th>
                    <th style={{ padding: '1rem', color: 'var(--text-gray)' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img src={c.photoUrl} alt="logo" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                          <div>
                            <p style={{ margin: 0, fontWeight: '600', color: 'var(--text-dark)' }}>{c.razonSocial}</p>
                            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-gray)' }}>RUC: {c.ruc}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>{c.username}</span>
                        <br/><span style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>Pass: {c.password}</span>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-gray)' }}>{c.encargado} <br/> {c.contacto}</td>
                      <td style={{ padding: '1rem' }}>
                        <button onClick={() => startEditUser(c)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--primary)' }}><Edit size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
