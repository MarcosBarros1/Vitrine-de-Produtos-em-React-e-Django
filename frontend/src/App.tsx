import { useEffect, useState } from 'react';
import axios from 'axios';


interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string | null;
}

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [busca, setBusca] = useState('');

  //Busca os dados do Backend assim que a tela carrega
  useEffect(() => {
    axios.get('http://localhost:8000/api/produtos/')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error("Erro ao conectar com o Django:", error);
        alert("Erro! Verifique se o servidor Django está rodando na porta 8000.");
      });
  }, []);

  //Função de adicionar ao carrinho
  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho([...carrinho, produto]);
  };

  //Filtro simples de pesquisa
  const produtosFiltrados = produtos.filter(p => 
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Cabeçalho */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
        <h1 style={{ margin: 0, color: '#333' }}> Vitrine de Produtos</h1>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '5px' }}>
            Itens no Carrinho: <strong>{carrinho.length}</strong>
          </div>
          <a 
            href="http://localhost:8000/admin" 
            target="_blank" 
            style={{ color: '#007bff', textDecoration: 'none', fontSize: '0.9rem' }}
          >
            🔒 Acesso Administrativo (Login)
          </a>
        </div>
      </header>

      {/* Barra de Pesquisa */}
      <div style={{ marginBottom: '30px' }}>
        <input 
          type="text" 
          placeholder="🔎 O que você procura?" 
          value={busca}
          onChange={e => setBusca(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '15px', 
            fontSize: '1rem', 
            borderRadius: '8px', 
            border: '1px solid #ddd',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Grid de Produtos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
        {produtosFiltrados.map(produto => (
          <div key={produto.id} style={{ border: '1px solid #eee', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            {/* Imagem */}
            <div style={{ height: '200px', background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {produto.imagem ? (
                <img 
                  src={produto.imagem} 
                  alt={produto.nome} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <span style={{ color: '#999' }}>Sem imagem</span>
              )}
            </div>

            {/* Informações */}
            <div style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>{produto.nome}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', height: '40px', overflow: 'hidden' }}>{produto.descricao}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2ecc71' }}>
                  R$ {produto.preco}
                </span>
                <button 
                  onClick={() => adicionarAoCarrinho(produto)}
                  style={{ 
                    background: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    padding: '10px 20px', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {produtosFiltrados.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
          Nenhum produto encontrado. Tente cadastrar algo no Admin!
        </p>
      )}
    </div>
  );
}

export default App;