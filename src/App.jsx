import { useEffect, useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar"
import Filter from "./components/Filter"
import Cards from "./components/Cards"
import Spinner from './components/Spinner'
import {apiUrl,filterData} from "./data";
import {toast} from "react-toastify";


function App() {
  const[courses,setCourses]=useState(null);

  const[loading,setLoading]=useState(true);

  async function fetchData() {
    setLoading(true);
    try {
        let res=await fetch(apiUrl);
        let output=await res.json();
        setCourses(output.data);
      } 
      catch (error) {
        toast.error("Something went wrong")
      }
      setLoading(false);
  }

  useEffect(() =>{
     fetchData();
  },[])
 
  return (
   <div>
       
     <div>
       <Navbar/>
     </div>

     <div>
       <Filter filterData={filterData}/>
     </div>

     <div>
      {
        loading?(<Spinner/>):(<Cards courses={courses}/>)
      }
     </div>

   </div>
  )
}

export default App
