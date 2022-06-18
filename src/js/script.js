const lista = document.querySelector(".produtosLista")
const listaCarrinho = document.querySelector(".listaProdutos")


function listarProdutos(){
    for(let i = 0; i < produtos.length; i++){
        const itemProduto = document.createElement("li")
        itemProduto.classList.add("cardProduto")
        itemProduto.id = produtos[i].id
        itemProduto.innerHTML = `
            <img src= ${produtos[i].image} alt=${produtos[i].nome}>
            <h3>${produtos[i].nome}</h3>
            <p>R$ ${produtos[i].preco.toFixed(2)}</p>
            <button type="button">Adicionar</button>
        `
        lista.appendChild(itemProduto)
    }
}


listarProdutos()
lista.addEventListener('click', adicionarProdutoAoCarrinho)

let carrinho = []

function adicionarProdutoAoCarrinho(event){
    const botaoAdicionar = event.target
    
    if(botaoAdicionar.tagName == "BUTTON"){
        const idProduto = botaoAdicionar.parentElement.id
        const produtoFiltrado = produtos.find((produto)=>produto.id == idProduto)
        carrinho.push(produtoFiltrado)       
    }

    listarProdutosDoCarrinho()

    calcularPrecoTotal()
}


function listarProdutosDoCarrinho(){
    listaCarrinho.innerHTML = ""

    for(let i = 0; i < carrinho.length; i++){
        const produto = carrinho[i]
       
        const itemProduto = document.createElement("li")
        itemProduto.classList.add("cardProduto")
        itemProduto.id = produto.id
       
        itemProduto.innerHTML = `
            <div class="infoNome">
                <img src=${produto.image} alt=${produto.nome}>
                <p>${produto.nome}</p>
            </div>
            
            <div class="infoPreco">
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <button><img src="./src/assets/lixo.png" alt="Lixo para remover produto"></button>                
            </div>
        `
        
        itemProduto.style.marginBottom = "10px" 
        listaCarrinho.appendChild(itemProduto)      
    }
}


function calcularPrecoTotal(){
    const infoPreco = document.querySelector('.infoPreco')
    let precoTotal = 0
    
    for(let i = 0; i < carrinho.length; i++){
    
        precoTotal += carrinho[i].preco
        infoPreco.innerText = `R$ ${precoTotal.toFixed(2)}`

    }

    if(carrinho.length == 0){
        infoPreco.innerText = 'R$ 0'
    }  
}

listaCarrinho.addEventListener('click', removerProdutoDoCarrinho)

function removerProdutoDoCarrinho(event){
    const botaoRemover = event.target
  
    if(botaoRemover.tagName == "BUTTON"){
        botaoRemover.closest("li").remove()
        
        const idProduto = botaoRemover.closest("li").id
        //produto <= FILTRO COM O FIND 
        const produtoRemovido = produtos.find((produto)=>produto.id == idProduto)
        //posicao numerica <= carrinho.INDEXOF(produto)
        const posicaoProdutoRemovido = carrinho.indexOf(produtoRemovido)
        //carrinho.SPLICE(posicao, 1)
        carrinho.splice(posicaoProdutoRemovido, 1)    
        
        calcularPrecoTotal()
    }
}


