
function todasUfs() {
    const ufSeletor = document.querySelector('select[name=estado]')

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json()})
    .then( estados => {

        for (const estado of estados) {
            ufSeletor.innerHTML += `<option value=${estado.id}>${estado.nome}</option>`
        }

        
    })
}

todasUfs()

function listarCidades(event) {
    const cidadeSeletor = document.querySelector('select[name=cidade]')
    const estadoInput = document.querySelector('input[name=estado]')

    const valorEstado = event.target.value

    const indexDoEstadoSelecionado = event.target.selectedIndex
    estadoInput.value = event.target.options[indexDoEstadoSelecionado].text

    const url= `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${valorEstado}/municipios`

    cidadeSeletor.innerHTML = '<option value> Selecione a Cidade </option>'
    cidadeSeletor.disabled = true;

    fetch(url)
    .then( (res) => {return res.json()})
    .then( cidades => {

        for (const cidade of cidades) {
            cidadeSeletor.innerHTML += `<option value=${cidade.nome}>${cidade.nome}</option>`
        }

        cidadeSeletor.disabled = false;
    })
}

document
    .querySelector('select[name=estado]')
    .addEventListener('change', listarCidades)



//itens de coleta

const itensColeta = document.querySelectorAll('.itens-grid li')

for (const item of itensColeta) {
    item.addEventListener('click', itemSelecionado)
}

let itensSelecionados = []

function itemSelecionado(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe

    itemLi.classList.toggle('selecionado')

    const itemId = itemLi.dataset.id
    
    const foiSelecionado = itensSelecionados.findIndex( function(item){
        const itemEncontrado = item == itemId
        return itemEncontrado
    })
}