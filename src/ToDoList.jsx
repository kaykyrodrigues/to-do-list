import React, { useState, useEffect } from 'react'
import './ToDoList.css'
import iconTdl from './assets/todolist.png'


function ToDoList() {

    const listaStorage = localStorage.getItem('Lista') 
    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : [])
    const [novoItem, setNovoItem] = useState(" ")

    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista))
    }, [lista])

    function adicionaItem(form) {
        form.preventDefault()
        if (!novoItem) {
            return;
        }

        setLista([...lista, { text: novoItem, isCompleted: false }])
        setNovoItem(" ")
        document.getElementById('input-entrada').focus()
    }


    function clicou(index) {
        const listaAux = [...lista]
        listaAux[index].isCompleted = !listaAux[index].isCompleted
        setLista(listaAux)
    }

    function deleta(index) {
        const listaAux = [...lista]
        listaAux.splice(index,1)
        setLista(listaAux)

    }

    function deletaLista() {
        setLista([])
    }

    return (
        <main>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input
                    id='input-entrada'
                    type="text"
                    onChange={(e) => { setNovoItem(e.target.value) }}
                    placeholder='Adicione uma tarefa...' />
                <button type="submit" className='add'>Add</button>
            </form>
            <div className='listTarefas'>
                <div>
                    {
                        lista.length < 1
                            ?
                            <img src={iconTdl} className='icone' />
                            :
                            lista.map((item, index) => (
                                <div
                                    key={index}
                                    className={item.isCompleted ? "item marcado" : "item"}>
                                    <span onClick={() => { clicou(index) }}>{item.text}</span>
                                    <button
                                        onClick={() => { deleta(index) }}
                                        className='del'>Deletar</button>
                                </div>
                            ))
                    }
                    {
                        lista.length > 0 && 
                        <button 
                        onClick={() => { deletaLista() }}
                        className='delAll'>Deletar Lista</button>
                    }
                    
                </div>
            </div>
        </main>
    )
}

export default ToDoList