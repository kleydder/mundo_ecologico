const DB_KEY = 'mundo_ecologico_db';

// Initial Mock Data
const initialState = {
  users: [
    { username: 'admin', password: '1219231201', role: 'admin' },
    { username: 'mundoecologico', password: '123456', role: 'admin' }
  ],
  certificates: [
    { id: 'CERT-2023-0891', date: '15/10/2023', type: 'Residuos Orgánicos', status: 'disponible', category: 'comercializacion', clientId: 'CLIENTE-001' },
    { id: 'CERT-2023-0892', date: '22/10/2023', type: 'Residuos Inorgánicos', status: 'disponible', category: 'comercializacion', clientId: 'CLIENTE-001' },
    { id: 'CERT-2023-0905', date: '05/11/2023', type: 'Residuos Peligrosos', status: 'pendiente', category: 'no_aprovechable', clientId: 'CLIENTE-002' },
    { id: 'CERT-2023-0912', date: '12/11/2023', type: 'Lodos Industriales', status: 'disponible', category: 'aguas_residuales', clientId: 'CLIENTE-001' },
    { id: 'CERT-2023-0924', date: '18/11/2023', type: 'Residuos Generales', status: 'pendiente', category: 'no_aprovechable', clientId: 'CLIENTE-001' },
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

export const authenticateUser = (username, password) => {
  const db = getDB();
  // Check if admin
  const admin = db.users.find(u => u.username === username && u.password === password);
  if (admin) return admin;

  // If not admin, simulate that ANY client can login for prototyping purposes
  if (username && password) {
    return { username, role: 'client' };
  }
  return null;
};

export const getCertificatesByClient = (clientId) => {
  const db = getDB();
  return db.certificates.filter(c => c.clientId === clientId);
};

export const getAllCertificates = () => {
  const db = getDB();
  return db.certificates;
};

export const addCertificate = (cert) => {
  const db = getDB();
  const newCert = {
    ...cert,
    id: `CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })
  };
  db.certificates.push(newCert);
  saveDB(db);
  return newCert;
};
