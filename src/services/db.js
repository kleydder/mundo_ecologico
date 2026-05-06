const DB_KEY = 'mundo_ecologico_db_v2';

// Datos Iniciales por Defecto
const initialState = {
  users: [
    { 
      id: 'usr_admin1', username: 'admin', password: '1219231201', role: 'admin',
      razonSocial: 'Administración Principal', encargado: 'Admin', ruc: '00000000000',
      ubicacion: 'Sede Central', contacto: 'N/A', photoUrl: '' 
    },
    { 
      id: 'usr_admin2', username: 'mundoecologico', password: '123456', role: 'admin',
      razonSocial: 'Gerencia General', encargado: 'Mundo Ecológico', ruc: '00000000001',
      ubicacion: 'Sede Central', contacto: 'N/A', photoUrl: '' 
    },
    { 
      id: 'usr_client1', username: 'usuario1', password: 'usuario1', role: 'client',
      razonSocial: 'Empresa de Prueba S.A.C.', encargado: 'Juan Pérez', ruc: '20123456789',
      ubicacion: 'Av. Industrial 123', contacto: '987654321', photoUrl: 'https://ui-avatars.com/api/?name=Empresa+Prueba&background=11d462&color=fff' 
    }
  ],
  certificates: [
    { id: 'CERT-2023-0891', date: '2023-10-15', type: 'Residuos Orgánicos', status: 'disponible', category: 'comercializacion', clientId: 'usr_client1' },
    { id: 'CERT-2023-0892', date: '2023-10-22', type: 'Residuos Inorgánicos', status: 'disponible', category: 'comercializacion', clientId: 'usr_client1' },
  ]
};

export const initDB = () => {
  if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify(initialState));
  }
};

export const getDB = () => {
  initDB();
  return JSON.parse(localStorage.getItem(DB_KEY));
};

export const saveDB = (data) => {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
};

// =======================
// AUTH & USERS
// =======================

export const authenticateUser = (username, password) => {
  const db = getDB();
  const user = db.users.find(u => u.username === username && u.password === password);
  return user || null;
};

export const getAllUsers = () => {
  return getDB().users.filter(u => u.role === 'client');
};

export const addUser = (userData) => {
  const db = getDB();
  // Verificar que username no exista
  if (db.users.some(u => u.username === userData.username)) {
    throw new Error('El nombre de usuario ya existe');
  }
  
  const newUser = {
    ...userData,
    id: `usr_${Date.now()}`,
    role: 'client',
    photoUrl: userData.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.razonSocial)}&background=11d462&color=fff`
  };
  
  db.users.push(newUser);
  saveDB(db);
  return newUser;
};

export const updateUser = (userId, updates) => {
  const db = getDB();
  const index = db.users.findIndex(u => u.id === userId);
  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...updates };
    saveDB(db);
    return db.users[index];
  }
  return null;
};

// =======================
// CERTIFICATES
// =======================

export const getCertificatesByClient = (clientId) => {
  return getDB().certificates.filter(c => c.clientId === clientId);
};

export const getAllCertificates = () => {
  return getDB().certificates;
};

export const addCertificate = (cert) => {
  const db = getDB();
  const newCert = {
    ...cert,
    id: `CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
  };
  db.certificates.push(newCert);
  saveDB(db);
  return newCert;
};
