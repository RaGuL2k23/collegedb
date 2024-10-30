import StudentsList from "./components/ListStudents"

 
 function App() { 

  return (
    <div  style={{
      backgroundImage: `url('https://mvit.edu.in/wp-content/images/Homeevents/Aboutmvit.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}  className='min-h-[100vh] pb-[3rem] text-center rounded-3xl  border-red-400 border-[4px] '>
      <h1 style={{textAlign:'center'}}  className='text-center  text-black font-bold drop-shadow-2xl text-underline'>COLLEGE DATABASE MANAGEMENT SYSTEM </h1>  
      <StudentsList/>
    </div>
  )
}

export default App
