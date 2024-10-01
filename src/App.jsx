import StudentsList from "./components/ListStudents"

 
 function App() { 

  return (
    <div  className=' text-center text-red-400 border-red-400 border-[4px] bg'>
      <h1 style={{textAlign:'center'}}  className='text-center  '>COLLEGE DATABASE MANAGEMENT SYSTEM </h1>  
      <StudentsList/>
    </div>
  )
}

export default App
