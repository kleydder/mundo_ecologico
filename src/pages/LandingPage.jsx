import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, FileCheck, ShieldCheck, Mail, Phone, MapPin, ChevronRight, Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.png';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'white',
        boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'all 0.3s ease',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? 'none' : '1px solid var(--border-color)',
        padding: '1rem 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Logo Placeholder */}
            <div style={{
              width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <img src={logoImg} alt="Mundo Ecológico" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-dark)', letterSpacing: '-0.5px' }}>
              Mundo Ecológico
            </span>
          </div>
          
          <button className="mobile-only" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: 'var(--text-dark)' }}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          
          {/* Mobile Overlay Menu */}
          {mobileMenuOpen && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: 'white',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '1.5rem', display: 'flex',
              flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--border-color)', zIndex: 999
            }}>
              <a href="#nosotros" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '500', color: 'var(--text-gray)', padding: '0.5rem 0' }}>Sobre Nosotros</a>
              <a href="#servicios" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '500', color: 'var(--text-gray)', padding: '0.5rem 0' }}>Servicios</a>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}>
                Mis Certificados <ChevronRight size={18} />
              </Link>
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-only">
            <a href="#nosotros" style={{ fontWeight: '500', color: 'var(--text-gray)', transition: 'color 0.2s' }} 
               onMouseOver={e => e.target.style.color = 'var(--primary)'}
               onMouseOut={e => e.target.style.color = 'var(--text-gray)'}>
              Sobre Nosotros
            </a>
            <a href="#servicios" style={{ fontWeight: '500', color: 'var(--text-gray)', transition: 'color 0.2s' }}
               onMouseOver={e => e.target.style.color = 'var(--primary)'}
               onMouseOut={e => e.target.style.color = 'var(--text-gray)'}>
              Servicios
            </a>
            <Link to="/login" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Mis Certificados <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{
        marginTop: '70px',
        position: 'relative',
        height: 'calc(100vh - 70px)',
        minHeight: '600px',
        maxHeight: '800px',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80") center/cover no-repeat',
        color: 'white'
      }}>
        <div className="container animate-fade-in" style={{ position: 'relative', zIndex: 10 }}>
          <span style={{ 
            display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: 'rgba(17, 212, 98, 0.2)', 
            border: '1px solid var(--primary)', borderRadius: '20px', fontSize: '0.875rem', fontWeight: '600', 
            marginBottom: '1.5rem', color: 'var(--primary-light)'
          }}>
            Líderes en Gestión Ambiental
          </span>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem',
            maxWidth: '800px', letterSpacing: '-1px'
          }}>
            Transformamos tus residuos en un futuro sostenible
          </h1>
          <p style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: '1.6', marginBottom: '2.5rem', maxWidth: '600px',
            color: 'rgba(255,255,255,0.9)'
          }}>
            Con años de experiencia en el rubro, nos especializamos en la eliminación y manejo responsable de residuos orgánicos e inorgánicos para las empresas más exigentes del país.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/login" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Portal de Clientes
            </Link>
            <a href="#contacto" className="btn btn-outline" style={{ 
              padding: '1rem 2rem', fontSize: '1.1rem', backgroundColor: 'rgba(255,255,255,0.1)',
              borderColor: 'white', color: 'white'
            }}
            onMouseOver={e => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'var(--text-dark)'; }}
            onMouseOut={e => { e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.target.style.color = 'white'; }}>
              Contáctanos
            </a>
          </div>
        </div>
      </header>

      {/* Clientes Reconocidos */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-light)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <p style={{ textAlign: 'center', color: 'var(--text-gray)', fontWeight: '600', marginBottom: '2rem', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.875rem' }}>
            Empresas que confían en nosotros
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', alignItems: 'center', opacity: 0.6, filter: 'grayscale(100%)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>MALL AVENTURA PLAZA</h2>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>OPEN PLAZA TRUJILLO</h2>
            {/* Add more fake logos/text here */}
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>REAL PLAZA</h2>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>INVERSIÓN EMPRESARIAL</h2>
          </div>
        </div>
      </section>

      {/* Servicios / Certificados */}
      <section id="servicios" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '1rem' }}>
              Gestión Integral y Certificada
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-gray)' }}>
              Brindamos seguridad jurídica y ambiental a tu empresa mediante la entrega oportuna de documentos que certifican la correcta disposición final de tus residuos.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Card 1 */}
            <div style={{ 
              padding: '2.5rem', borderRadius: '16px', backgroundColor: 'white', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)',
              transition: 'transform 0.3s', cursor: 'pointer'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Leaf size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Recojo de Residuos</h3>
              <p style={{ color: 'var(--text-gray)', lineHeight: '1.6' }}>
                Recolección especializada de residuos orgánicos e inorgánicos cumpliendo con todas las normativas de seguridad e higiene industrial.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{ 
              padding: '2.5rem', borderRadius: '16px', backgroundColor: 'var(--text-dark)', color: 'white',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)', cursor: 'pointer', transform: 'scale(1.02)'
            }}
            >
              <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <FileCheck size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Certificados Oficiales</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
                Accede en tiempo real a tus certificados de disposición final, documento esencial para las auditorías ambientales de tu empresa.
              </p>
            </div>

            {/* Card 3 */}
            <div style={{ 
              padding: '2.5rem', borderRadius: '16px', backgroundColor: 'white', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)',
              transition: 'transform 0.3s', cursor: 'pointer'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Garantía y Confianza</h3>
              <p style={{ color: 'var(--text-gray)', lineHeight: '1.6' }}>
                Más de una década brindando servicio ininterrumpido a los centros comerciales e industrias más grandes de la región norte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#f8fafc', borderTop: '1px solid var(--border-color)', padding: '4rem 0 2rem', marginTop: 'auto' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Leaf size={24} color="var(--primary)" />
                <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-dark)' }}>
                  Mundo Ecológico
                </span>
              </div>
              <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
                Comprometidos con el desarrollo sustentable y la gestión ambiental responsable.
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem' }}>Enlaces Rápidos</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><a href="#" style={{ color: 'var(--text-gray)', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-gray)'}>Sobre Nosotros</a></li>
                <li><a href="#servicios" style={{ color: 'var(--text-gray)', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-gray)'}>Servicios</a></li>
                <li><Link to="/login" style={{ color: 'var(--text-gray)', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-gray)'}>Portal de Clientes</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem' }}>Contacto</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-gray)' }}>
                  <MapPin size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Av. Principal 123, Zona Industrial, Trujillo, Perú</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-gray)' }}>
                  <Phone size={20} color="var(--primary)" />
                  <span>+51 987 654 321</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-gray)' }}>
                  <Mail size={20} color="var(--primary)" />
                  <span>contacto@mundoecologico.pe</span>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ pt: '2rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} Mundo Ecológico. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
