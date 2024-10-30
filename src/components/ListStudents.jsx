import { useEffect, useState } from 'react';
import axios from 'axios';

const StudentsList = () => {
    const [students, setStudents] = useState(() => ({ rows: [], fields: [] }));
    const [loading, setLoading] = useState(() => true);
    const [error, setError] = useState(() => null);
    const [viewParam, setViewParam] = useState(() => '');
    const [limit, setLimit] = useState(() => '5');
    const [order, setOrder] = useState(() => 'DESC');

    const[topic,setTopic] = useState(`Top 5 Students with Highest Grades`);
    

    useEffect(() => {
        console.log('view:', viewParam);
        setTopic(`${ order=='DESC' ? "Top":"Last"} ${limit} Students with ${ order=='DESC' ? "Highest":"Lowest"} Grades`)
        const fetchStudents = async () => {
            try {
                let queryParams = [];
                if (viewParam) queryParams.push(`view=${viewParam}`);
                if (limit) queryParams.push(`limit=${limit}`);
                queryParams.push(`order=${order}`);
                
                const queryString = queryParams.join('&'); 

                const res = await axios.get(`http://localhost:3000/students/?${queryString}`);
                console.log(res.data);
                setStudents({
                    rows: res.data?.rows || [],
                    fields: res.data?.fields || []
                });
            } catch (err) {
                console.error("Error fetching students:", err);
                setError('Failed to load students. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [viewParam, limit, order]); 

    
    const handleLimitChange = (e) => {
        let val = e.target.value
        if (val >=1 ) { 
            setLimit(val);
        }
        else if (val <=0){
            alert('Not allowed')
        }
        
    };

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div 
       
         className="container   w-[80vw]   m-auto  mt-5 ">
            <h1 className="text-2xl text-black font-bold mb-4">{viewParam =='' && topic}</h1>
            <div className="mb-4">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                    onClick={() =>  setViewParam('teachers')}
                >
                     Teachers
                </button>
                <button
                    className="bg-yellow-500 text-white px-7 py-2   rounded hover:bg-yellow-600"
                    onClick={() =>  setViewParam('subjects')}
                >
                    {"Student's Grades"}
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 ml-3 rounded mr-2 hover:bg-green-600"
                    onClick={() => {
                        setViewParam('studentGrades') 
                    }}
                >
                    Show Students CGPA
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                    onClick={() =>{
                        setOrder( 'DESC' )  
                        setViewParam('')
                        
                    }}
                > 
                     Top Students
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                    onClick={() =>{
                        setOrder('ASC' ) 
                        setViewParam('')
                        
                    }}
                > 
                     Last Students 
                </button>
               {viewParam == '' &&  
               <input 
                    type="number" 
                    value={limit} 
                    onChange={handleLimitChange} 
                    placeholder="Set Limit" 
                    className="border px-2 py-1"
                />}
            </div>

            {viewParam && <div className="mb-4 text-black">Currently Viewing: {viewParam =='subjects' ?' Students Grade':viewParam == 'studentGrades'?'Student CGPA':viewParam}</div>}

            <div className='max-h-[52vh] overflow-auto w-full rounded-2xl cursor-pointer'>
            <table  className=" w-full  m-auto bg-white border border-gray-300">
                <thead
                    style={{
                        position: 'sticky',
                        top: 0
                    }}
                >
                    <tr className="bg-gray-200 text-red-600">
                        {students.fields.map((field, index) => (
                            <th  key={index} scope="col" className="border border-white px-4 py-2">
                                {field.name.replace('_', ' ').toUpperCase()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {students.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-100">
                            {students.fields.map((field, fieldIndex) => (
                                <td style={{borderRight:'1px solid '  }} key={fieldIndex} className="border border-10 border-r-black border-r-[3px]  border-b-black text-black    border-white px-4 py-2
                                ">
                                    {row[field.name]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default StudentsList;
