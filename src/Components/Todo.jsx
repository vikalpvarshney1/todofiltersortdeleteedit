import React, { useEffect, useState } from 'react'

const Todo = () => {
    const [input, setInput] = useState("")
    const [number, setnumber] = useState();
    const [opt, setopt] = useState('')
    const [todo, settodo] = useState([])
    const [todos, settodos] = useState([])
    const [page, setpage] = useState(1)
    useEffect(() => {
        getdata()
    }, [page])

    const getdata = () => {
        fetch(`http://localhost:3001/todos?_page=${page}&_limit=3`)
            .then((res) => res.json())
            .then((res) => {
                settodo(res)
                settodos(res)
            }).catch((err) => {
                console.log(err)
            })
    }

    const handleADD = () => {
        const payload = {
            name: input,
            no: number,
            select: opt,
            status: false,
        }
        const payloadjson = JSON.stringify(payload)
        fetch(`http://localhost:3001/todos`, {
            method: "POST",
            body: payloadjson,
            headers: {
                "content-type": "application/json"
            }
        })
            .then((res) => {
                console.log(res.json())
                getdata()
            }).catch((err) => console.log(err));
    }
    const handleDelete = (id) => {
        console.log(id);
        fetch(`http://localhost:3001/todos/${id}`, {
            method: "DELETE",

        })
            .then(() => {
                // console.log(res)
                getdata()
            }).catch((err) => console.log(err));
    }

    const handleedit=(id)=>{
        const payload = {
            name: input,
            no: number,
            select: opt,
            status: false,
        }
        const payloadjson = JSON.stringify(payload)
        fetch(`http://localhost:3001/todos/${id}`, {
            method: "PUT",
            body: payloadjson,
            headers: {
                "content-type": "application/json"
            }
        })
            .then((res) => {
                console.log(res.json())
                getdata()
            }).catch((err) => console.log(err));

    }
    const handlestudent = () => {
        const update = todo.filter((data) => data.select == "student")

        settodos(update)
    }
    const handleteacher = () => {
        const update = todo.filter((data) => data.select == "teacher")
        settodos(update)
    }
    const handlemaster = () => {
        const update = todo.filter((data) => data.select == "master")
        settodos(update)
    }
    const handleall = () => {
        settodos(todo)
    }

    const handlesort=()=>{
        var s=[...todos]
        s.sort((a,b)=>{
            return (a.no)- (b.no)
        })
        settodos(s)
    }

    const handlesortdec = () => {
        var s = [...todos]
        s.sort((a, b) => {
            return (b.no) - (a.no)
        })
        settodos(s)
    }

    return (
        <div>
            <input type="text"
                placeholder='Enter name'
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <br />
            <input type="number"
                placeholder='Enter no'
                value={number}
                onChange={(e) => setnumber(e.target.value)}
            />
            <br />
            <label name="s" >
                option
                <select name='s' onChange={(e) => setopt(e.target.value)} value={opt}>
                    <option value="">select</option>
                    <option value="student">Students</option>
                    <option value="teacher">teacher</option>
                    <option value="master">master</option>
                </select>
            </label>
            <br />
            <button onClick={handleADD}>ADD</button>
            <button onClick={() => handlestudent()}>student</button>
            <button onClick={() => handleteacher()}>teacher</button>
            <button onClick={() => handlemaster()}>master</button>
            <button onClick={() => handleall()}>all</button>
            <button onClick={()=> handlesort()}>sortacending</button>
            <button onClick={() => handlesortdec()}>sortdecending</button>
            
            <div>

                {
                    todos.map((item) => {
                        return <div key={item.id}>
                            {item.name}&nbsp;{item.no} &nbsp;
                            {item.select}&nbsp;
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                            <button onClick={()=> handleedit(item.id)}>edit</button>
                        </div>
                    })
                }
                <button onClick={() => setpage(page - 1)} disabled={page===1}>prev </button>
                <button onClick={() => setpage(page + 1)}>next</button>
            </div>
        </div>
    )
}

export default Todo