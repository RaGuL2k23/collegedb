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
        setTopic(`${ order=='ASC' ? "Top":"Last"} ${limit} Students with ${ order=='ASC' ? "Highest":"Lowest"} Grades`)
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
        setLimit(e.target.value);
    };

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto mt-5 ">
            <h1 className="text-2xl font-bold mb-4">{topic}</h1>
            <div className="mb-4">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                    onClick={() =>  setViewParam('teachers')}
                >
                    Show Teachers
                </button>
                <button
                    className="bg-yellow-500 text-white px-7 py-2   rounded hover:bg-yellow-600"
                    onClick={() =>  setViewParam('subjects')}
                >
                    Show Subjects
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 ml-3 rounded mr-2 hover:bg-green-600"
                    onClick={() =>  setViewParam('')}
                >
                    Show Students CGPA
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                    onClick={() =>{
                        setOrder( 'DESC' )  
                        
                    }}
                > 
                     Last Students
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                    onClick={() =>{
                        setOrder('ASC' ) 
                        
                    }}
                > 
                     Top Students 
                </button>
                <input 
                    type="number" 
                    value={limit} 
                    onChange={handleLimitChange} 
                    placeholder="Set Limit" 
                    className="border px-2 py-1"
                />
            </div>

            {viewParam && <div className="mb-4">Currently Viewing: {viewParam}</div>}

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
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
                                <td style={{border:'1px solid white'}} key={fieldIndex} className="border border-10  border-white px-4 py-2">
                                    {row[field.name]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentsList;
