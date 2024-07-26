import React, { useContext, useEffect,useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom';


const Homepage = () => {
 
    let navigate=useNavigate();
    const [r,sr]=useState(true);
   const [notesData,setnotesData]=useState();
    // console.log(notesData.length);
    useEffect(async () => {
        console.log("skjdfsdf kd   ")
        const response = await fetch('https://notes-sapplication-api-pi.vercel.app/api/notes/fetchall', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "jwtData": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1OWQwM2MzOWNiZGNjNGUwYjAyM2JlIn0sImlhdCI6MTcxMTcwNTcyN30.--rBoosT52mW5eIcPs7yrE-IVi2_aCovDSr_ZGF5ndM`
            }
        });
        const data = await response.json();
        console.log(data);
          setnotesData(data);
        // console.log(notesData);
    });

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note1, setNote1] = useState({id:" ", title: "", edescription: "",estatus: "",epriority: ""})
     
    const updateNote = (currentNote) => {
        // console.log(currentNote);
        // console.log("this note is updating");
        ref.current.click();
       // setNote({title: note.title, description:note.description, tag: note.tag});
        setNote1({ id:currentNote._id,title: currentNote.title, edescription: currentNote.description,estatus:currentNote.status,epriority:currentNote.priority});
        console.log(note1.title);
        // console.log(setNote1);
        
    }

    const handleClick = (e)=>{ 
        editNote( note1.id,note1.title, note1.edescription,note1.estatus,note1.epriority);
        refClose.current.click();
        toast("Editted the note Sucessfully");
    }
      
    const onChange = (e)=>{
        setNote1({...note1, [e.target.name]: e.target.value})
    }

  const [active,setactive] = useState(JSON.stringify({id:" ", title: "", description: "",status: "",priority: ""}));
  const [searchInput, setSearchInput] = useState('');
  const [selectedPriority, setSelectedPriority] = useState(''); 
  const [endDate, setEndDate] = useState(null);
  const [sortPriority,setSortPriority] = useState(''); 
  const onDrop =(i,title,s,pos)=>{
    console.log(i,title,active,s,pos);
    if(active===null || active===undefined) return; 
    const newNote=JSON.parse(active);
    editNote( newNote._id,newNote.title, newNote.description,s,newNote.priority);
  }

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSortPriorityChange = (e) => {
      setSortPriority(e.target.value);

  }
  // Handle priority selection
  const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value);
    console.log(e.target.value);
  };
 
  const filteredNotes = notesData.filter((note) => {
    const titleMatches = note.title.toLowerCase().includes(searchInput.toLowerCase());
    const priorityMatches = !selectedPriority || note.priority.toLowerCase() === selectedPriority.toLowerCase();
    // const sortedNotes = !setSortPriority;
     return titleMatches && priorityMatches ;
  });


 
  
    return (
    <div>  <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
</button>
       <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={note1.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note1.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Status</label>
                                    <input type="text" className="form-control" id="estatus" name="estatus" value={note1.estatus} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="priority" className="form-label">Priority</label>
                                    <input type="text" className="form-control" id="epriority" name="epriority" value={note1.epriority} onChange={onChange} minLength={5} required/>
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note1.title.length<5 || note1.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* style={{ padding: 20 ,display :'flex',flexDirection:'row' }} */}
            <h3 className=' p-4 '> Fliter By : </h3>
       <div className='p-4 grid grid-cols-4  gap-4 md:grid-cols-4 sm:grid-cols-2 md:gap-3 '>
      
      <input          icon="search"
        placeholder="Search by title..."
        value={searchInput}
        onChange={handleSearchChange} 
        className='mx-2 border-solid border-2 border-black-800 p-2 text-center sm:w-full'
      />
      <select
        value={selectedPriority}
        onChange={handlePriorityChange}
        className='border-solid border-2 border-black-800 text-center'
      >
        {/* md:w-1/2 sm:w-full border-solid border-2 border-black-800' */}
        <option value="">Select priority</option>
        <option value="p0">P0</option>
        <option value="p1">P1</option>
        <option value="p2">P2</option>
      </select>

</div>



<div className='flex flex-row p-4'>
        <h3 className='p-4'> Sorted By : </h3>
      
      <select
        value={sortPriority}
        onChange={handleSortPriorityChange}
        className='border-solid border-2 border-black-800 '
      >
        <option value="hi">Select priority</option>
        <option value="p0">P0</option>
        <option value="p1">P1</option>
        <option value="p2">P2</option>
      </select>
    </div>

    <div className="  my-3 mx-6  p-4">
    <h1 className="text-2xl font-bold mb-6 ml-3">Task Manager</h1>
    <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-2" index={12} >
      {/* Completed Tasks  space-x-4 */}

      <div className="hii5 md:w-full sm:w-full " key={1}>
             <div className='md:w-full sm:w-full' style={{backgroundColor: '#4793AF',}}>
             <h3 className="text-lg grey font-semibold text-center  mt-3 mb-0 p-4 ">Pending</h3>
              </div>
              {  filteredNotes.length !==0 ?  filteredNotes.filter((task) => (task.status).toLowerCase() === 'pending')
      .length!==0 ?
      filteredNotes.filter((task) => (task.status).toLowerCase() === 'pending').map((task,index) => (
           <React.Fragment>
              <DropArea onDrop={()=> onDrop(task._id,task.title,task.status,index)}  />
               <TaskCard setactive={setactive} updateNote={updateNote}  index={index} task={task} />
               <DropArea onDrop={()=> onDrop(task._id,task.title,task.status,index+1)} /> 
            </React.Fragment>  ))
        : <React.Fragment ><DropArea onDrop={()=> onDrop(0,0,"pending",0)}  /> </React.Fragment> 
       : <h4 className='text-center my-2'>No Notes to display</h4> }
      </div>
      

      <div className="hii1" key={2}>
      <div  style={{backgroundColor: 'grey',}}>
         <h3 className="text-lg grey font-semibold text-center   mt-3 mb-0 p-4">In Progress</h3>
      </div>
      {  filteredNotes.length !==0 ?  filteredNotes.filter((task) => (task.status).toLowerCase() === 'incomplete')
      .length!==0 ?
      filteredNotes.filter((task) => (task.status).toLowerCase() === 'incomplete').map((task,index) => (
           <React.Fragment>
              <DropArea onDrop={()=> onDrop(task._id,task.title,task.status,index)}  />
               <TaskCard setactive={setactive} updateNote={updateNote}  index={index} task={task} />
               <DropArea onDrop={()=> onDrop(task._id,task.title,task.status,index+1)} /> 
            </React.Fragment>  ))
        : <React.Fragment ><DropArea onDrop={()=> onDrop(0,0,"incomplete",0)}  /> </React.Fragment> 
       : <h4 className='text-center my-2'>No Notes to display</h4> }
      </div>

      {/* Deployed Tasks */}
      <div className="hii2 " key={3}>
      <div  style={{backgroundColor: '#7EA1FF'}}>
      <h3 className="text-lg grey font-semibold text-center  mt-3 mb-0 p-4">Completed</h3>
      </div>
      {  filteredNotes.length !==0 ?  filteredNotes.filter((task) => (task.status).toLowerCase() === 'completed')
      .length!==0 ?
      filteredNotes.filter((task) => (task.status).toLowerCase() === 'completed').map((task,index) => (
           <React.Fragment>
              <DropArea onDrop={()=> onDrop(task._id,task.title,task.status,index)}  />
               <TaskCard setactive={setactive} updateNote={updateNote}  index={index} task={task} />
               <DropArea onDrop={()=> onDrop(task._id,task.title,task.status,index+1)} /> 
            </React.Fragment>  ))
        : <React.Fragment ><DropArea onDrop={()=> onDrop(0,0,"completed",0)}  /> </React.Fragment> 
       : <h4 className='text-center my-2'>No Notes to display</h4> }
      </div>

      <div className="hii3" key={4}>
      <div  style={{backgroundColor: '#ECCA9C'}}>
        <h3 className="text-lg grey font-semibold text-center  mt-3 mb-0 p-4">Deployed</h3>
        </div>
        {  filteredNotes.length !==0 ?  filteredNotes.filter((task) => (task.status).toLowerCase() === 'deployed')
      .length!==0 ?
      filteredNotes.filter((task) => (task.status).toLowerCase() === 'deployed').map((task,index) => (
           <React.Fragment>
              <DropArea onDrop={()=> onDrop(task._id,task.title,task.status,index)}  />
               <TaskCard setactive={setactive} updateNote={updateNote}  index={index} task={task} />
               <DropArea onDrop={()=> onDrop(task._id,task.title,task.status,index+1)} /> 
            </React.Fragment>  ))
        : <React.Fragment ><DropArea onDrop={()=> onDrop(0,0,"deployed",0)}  /> </React.Fragment> 
       : <h4 className='text-center my-2'>No Notes to display</h4> }
      </div>


      <div className="hii4" key={5}>
      <div  style={{backgroundColor: '#BC7FCD'}}>
        <h3 className="text-lg grey font-semibold text-center  mt-3 mb-0 p-4">Deffered</h3>
        </div>
        {  filteredNotes.length !==0 ?  filteredNotes.filter((task) => (task.status).toLowerCase() === 'deffered')
      .length!==0 ?
      filteredNotes.filter((task) => (task.status).toLowerCase() === 'deffered').map((task,index) => (
           <React.Fragment>
              <DropArea onDrop={()=> onDrop(task._id,task.title,task.status,index)}  />
               <TaskCard setactive={setactive} updateNote={updateNote}  index={index} task={task} />
               <DropArea onDrop={()=> onDrop(task._id,task.title,task.status,index+1)} /> 
            </React.Fragment>  ))
        : <React.Fragment ><DropArea onDrop={()=> onDrop(0,0,"deffered",0)}  /> </React.Fragment> 
       : <h4 className='text-center my-2'>No Notes to display</h4> }
      </div>
    </div>
  </div>
  </div>
    );
  };
  
  export default Homepage;