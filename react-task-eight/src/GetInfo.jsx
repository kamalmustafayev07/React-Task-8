import { useEffect, useState } from "react"

export default function GetInfo(){
    let [listItems,setListItems]=useState([]);
    let [input,setInput]=useState('');
    let [select,setSelect]=useState('All departments');
    let [departments,setDepartments]=useState([]);

    useEffect(()=>{
        fetch("https://5ea5ca472d86f00016b4626d.mockapi.io/brotherhood")
        .then((res)=>res.json())
        .then((data)=>{
            let arr = []
            data.forEach(element => {
                arr.push(element.department)
            });
            let newArr = new Set(arr)
            console.log(newArr)
            function selectHandle(ev){
                setSelect(ev.target.value)
                setDepartments([...newArr])
                if(select === 'All departments'){
                    setListItems(data)
                }else{
                    setListItems(data.filter((item)=>item.department === select))
                }
            }
           
            function inputHandle(ev){
                setInput(ev.target.value)
                setListItems(data.filter((item)=> item.name.startsWith(input)));
            }
        })
    },[select])

    return(
        <>
            <label htmlFor="search">Search : </label>
            <input type="text" onChange={inputHandle(ev)} name="search"/>
            <select onChange={selectHandle(ev)}>
                <option value="All departments">All departments</option>
                {departments.map((item,index)=>{
                    return(
                        <option key={index} value={`${item}`}>{item}</option>
                    )
                })}
            </select>
            <ul>
                {listItems.map((item)=>{
                    return(
                        
                        <li key={item.id}>
                            <p>Name: {item.name}</p>
                            <p>Department: {item.department}</p>
                            <p>Role: {item.role}</p>
                        </li> 
                    )
                })}
            </ul>
        </>
    )
}