function addRow(){
    const mytable = document.getElementById("table_id")
    const newRow = mytable.insertRow()
    const cell1 = newRow.insertCell()

    cell1.innerHTML = "4"
}
