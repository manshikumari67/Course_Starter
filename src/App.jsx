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

  const[category,setCategory]=useState(filterData[0].title)

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
   <div className='min-h-screen flex flex-col '>
       
     <div>
       <Navbar/>
     </div>

     <div>
      <div>
       <Filter 
       filterData={filterData}
       category={category}
       setCategory={setCategory}
       />
     </div>

     <div className='w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]'>
      {
        loading?(<Spinner/>):(<Cards courses={courses}/>)
      }
     </div>
     </div>

   </div>
  )
}

export default App
