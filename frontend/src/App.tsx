import { useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import logoImg from './assets/logo.png';

// --- TIPOS ---
interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string | null;
}

// --- ESTILOS (CSS in JS para facilitar) ---
const styles = {
  container: { fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: '#f4f6f9', minHeight: '100vh' },
  header: { background: '#2c3e50', padding: '1rem 2rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' },
  logo: { height: '50px', width: 'auto', display: 'block' },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '15px', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' },
  navInfo: { display: 'flex', gap: '20px', alignItems: 'center' },
  buttonLogin: { background: '#3498db', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' as const },
  buttonLogout: { background: '#e74c3c', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' as const },
  adminLink: { background: '#27ae60', color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' as const },
  main: { width: '100%', margin: '30px 0', padding: '0 40px', boxSizing: 'border-box' as const },
  searchBar: { width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginBottom: '30px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' },
  card: { background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'transform 0.2s' },
  cardImage: { height: '200px', width: '100%', objectFit: 'cover' as const, background: '#eee' },
  cardBody: { padding: '20px' },
  cardTitle: { margin: '0 0 10px 0', fontSize: '1.2rem', color: '#2c3e50' },
  cardDesc: { color: '#7f8c8d', fontSize: '0.9rem', marginBottom: '15px', height: '40px', overflow: 'hidden' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' },
  price: { fontSize: '1.4rem', fontWeight: 'bold', color: '#27ae60' },
  buttonBuy: { background: '#2980b9', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' as const, transition: 'background 0.2s' },
  
  // Estilos da Tela de Login
  loginContainer: { maxWidth: '400px', margin: '100px auto', background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', textAlign: 'center' as const },
  input: { width: '100%', padding: '12px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' as const },
  loginBtn: { width: '100%', padding: '12px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', marginTop: '10px' },
  errorMsg: { color: 'red', fontSize: '0.9rem', marginTop: '10px' }
};

function App() {
  // --- ESTADOS ---
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [busca, setBusca] = useState('');
  
  // Estados de Autenticação (Frontend Mock)
  const [isLogged, setIsLogged] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroLogin, setErroLogin] = useState('');

  // --- LÓGICA ---
  
  // 1. Busca dados do Backend
  useEffect(() => {
    axios.get('http://localhost:8000/api/produtos/')
      .then(res => setProdutos(res.data))
      .catch(err => console.error(err));
  }, []);

  // 2. Função de Login (Hardcoded / Mock)
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // USUÁRIO PRÉ-CADASTRADO NO CÓDIGO
    if (email === 'admin@loja.com' && senha === '123456') {
      setIsLogged(true);
      setShowLoginScreen(false); // Volta para a vitrine
      setErroLogin('');
    } else {
      setErroLogin('Credenciais inválidas! Tente admin@loja.com / 123456');
    }
  };

  const handleLogout = () => {
    setIsLogged(false);
    setEmail('');
    setSenha('');
  };

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const produtosFiltrados = produtos.filter(p => 
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // --- RENDERIZAÇÃO ---

  // Tela de Login
  if (showLoginScreen) {
    return (
      <div style={styles.container}>
        <div style={styles.loginContainer}>
          <h2 style={{color: '#2c3e50'}}>🔐 Acesso Restrito</h2>
          <p style={{color: '#7f8c8d', marginBottom: '20px'}}>Entre para gerenciar a loja</p>
          
          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="E-mail (admin@loja.com)" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={styles.input}
            />
            <input 
              type="password" 
              placeholder="Senha (123456)" 
              value={senha}
              onChange={e => setSenha(e.target.value)}
              style={styles.input}
            />
            {erroLogin && <p style={styles.errorMsg}>{erroLogin}</p>}
            
            <button type="submit" style={styles.loginBtn}>Entrar</button>
            <button 
              type="button" 
              onClick={() => setShowLoginScreen(false)} 
              style={{...styles.loginBtn, background: 'transparent', color: '#7f8c8d', marginTop: '5px'}}
            >
              Voltar para a Loja
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Tela da Vitrine (Principal)
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
      {/* Logo com Imagem e Texto */}
        <div style={styles.logoContainer}>
          <img src={logoImg} alt="Vitrine Pro Logo" style={styles.logo} />
          <span>Vitrine Pro</span>
        </div>

      <div style={styles.navInfo}>
          {/* Mostra carrinho para todos */}
          <span>🛒 Carrinho: <strong>{carrinho.length}</strong></span>

          {/* Se estiver logado, mostra botão Admin e Logout */}
          {isLogged ? (
            <>
              <a href="http://localhost:8000/admin" target="_blank" style={styles.adminLink}>
                ⚙️ Painel Django
              </a>
              <span style={{fontSize: '0.9rem'}}>Olá, Admin</span>
              <button onClick={handleLogout} style={styles.buttonLogout}>Sair</button>
            </>
          ) : (
            // Se NÃO estiver logado, mostra botão de Entrar
            <button onClick={() => setShowLoginScreen(true)} style={styles.buttonLogin}>
              Área Admin
            </button>
          )}
        </div>
      </header>

      <main style={styles.main}>
        {/* Busca */}
        <input 
          type="text" 
          placeholder="🔎 Buscar produtos..." 
          value={busca}
          onChange={e => setBusca(e.target.value)}
          style={styles.searchBar}
        />

        {/* Grid de Produtos */}
        <div style={styles.grid}>
          {produtosFiltrados.map(produto => (
            <div key={produto.id} style={styles.card}>
              {produto.imagem ? (
                <img src={produto.imagem} alt={produto.nome} style={styles.cardImage} />
              ) : (
                <div style={{...styles.cardImage, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999'}}>
                  Sem Foto
                </div>
              )}
              
              <div style={styles.cardBody}>
                <h3 style={styles.cardTitle}>{produto.nome}</h3>
                <p style={styles.cardDesc}>{produto.descricao}</p>
                
                <div style={styles.cardFooter}>
                  <span style={styles.price}>R$ {produto.preco}</span>
                  <button 
                    onClick={() => adicionarAoCarrinho(produto)}
                    style={styles.buttonBuy}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;