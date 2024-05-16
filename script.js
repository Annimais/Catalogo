// Array para armazenar os itens no carrinho
let carrinho = [];

// Função para adicionar um item ao carrinho
function adicionarItem(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}

// Função para remover um item do carrinho
function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Função para atualizar o conteúdo do carrinho na página
function atualizarCarrinho() {
    const listaItens = document.getElementById('lista-itens');
    const totalElement = document.getElementById('total');
    
    // Limpar a lista de itens
    listaItens.innerHTML = '';
    
    // Calcular o total
    let total = 0;
    
    // Adicionar cada item à lista
    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        
        // Botão de adicionar
        const botaoAdicionar = document.createElement('button');
        botaoAdicionar.textContent = '+';
        botaoAdicionar.addEventListener('click', () => {
            adicionarItem(item.nome, item.preco);
        });
        li.appendChild(botaoAdicionar);
        
        // Botão de remover
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = '-';
        botaoRemover.addEventListener('click', () => {
            removerItem(index);
        });
        li.appendChild(botaoRemover);
        
        listaItens.appendChild(li);
        
        total += item.preco;
    });
    
    // Atualizar o total na página
    totalElement.textContent = total.toFixed(2);
}

// Função para enviar o pedido via WhatsApp
function enviarPedido() {
    let mensagem = 'Pedido:';
    carrinho.forEach((item, index) => {
        mensagem += `\n${item.nome} - R$ ${item.preco.toFixed(2)}`;
    });
    mensagem += `\nTotal: R$ ${carrinho.reduce((total, item) => total + item.preco, 0).toFixed(2)}`;
    
    // Substitua "seu-número" pelo seu número de telefone com código do país e DDD
    window.open(`https://api.whatsapp.com/send?phone=5511988201237&text=${encodeURIComponent(mensagem)}`, '_blank');
}

// Event listener para o botão de checkout
document.getElementById('checkout').addEventListener('click', enviarPedido);

// Event listener para o botão de adicionar
document.getElementById('adicionar').addEventListener('click', () => {
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    if (nome && preco) {
        adicionarItem(nome, preco);
    } else {
        alert('Por favor, insira o nome e o preço do item.');
    }
});

// Adicionar alguns itens de exemplo ao carregar a página (pode ser removido em produção)
adicionarItem('Produto 1', 10);
adicionarItem('Produto 2', 20);
adicionarItem('Produto 3', 30);
