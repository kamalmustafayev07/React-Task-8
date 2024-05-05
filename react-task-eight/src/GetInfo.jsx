import { useEffect, useState } from "react"
import "./GetInfo.css";

export default function GetInfo(){
    let [listItems,setListItems]=useState([]);
    let [departments,setDepartments]=useState([]);
    let [input,setInput]=useState("");
    let [select,setSelect]=useState('All departments');
    

    useEffect(()=>{
        fetch("https://5ea5ca472d86f00016b4626d.mockapi.io/brotherhood")
        .then((res)=>res.json())
        .then((data)=>{
                let arr = [];
                let dataArr=[];
                data.forEach(element => {
                dataArr.push(element);
                arr.push(element.department)
                });
                let departmentsSet = new Set(arr);
                setDepartments([...departmentsSet]);
                dataArr=dataArr.filter((item)=>{
                if(select==='All departments'){
                    return true;
                }else{
                    return item.department===select;
                }
                });
                dataArr=dataArr.filter(item=>item.name.startsWith(input));
                setListItems([...dataArr]);  
            });          
    },[input,select]);

    return(
        <>
        <div className="container">
        <form>
            <label htmlFor="search">Search : </label>
            <input type="text" onChange={(ev)=>{setInput(ev.target.value);}} name="search"/>
            <select onChange={(ev)=>setSelect(ev.target.value)}>
                <option value="All departments">All departments</option>
                {departments.map((item,index)=>{
                    return(
                        <option key={index} value={`${item}`}>{item}</option>
                    )
                })}
            </select>
            </form>
            {listItems.length>0 && (
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
            )}
        </div>
        </>
    )
}