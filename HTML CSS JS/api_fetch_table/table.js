function getPost(){
    container = document.getElementById('data-container')

    const table = document.createElement('table')
    container.appendChild(table)
    const header = ['ID', 'TITLE', 'POST']

    const headerRow = document.createElement('tr')

    header.forEach(element=>{
        const th = document.createElement('th')
        th.textContent = element
        headerRow.appendChild(th)
    })
    table.appendChild(headerRow)

    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => 
        data.forEach(element=>{
        const row = document.createElement('tr')

        const idCell = document.createElement('td')
        idCell.textContent = element.id
        row.appendChild(idCell)

        const titleCell = document.createElement('td')
        titleCell.textContent = element.title
        row.appendChild(titleCell)

        const postCell = document.createElement('td')
        postCell.textContent = element.body
        row.appendChild(postCell)
        
        table.appendChild(row)
    }))
}