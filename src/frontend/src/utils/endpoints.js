const CreateProperty=async(Property)=>{ 
  return  await window.canister.PropeonCanister.CreateProperty(Property)
}

const  GetAllProperty=async()=>{ 
  return  await window.canister.PropeonCanister.GetAllProperty()
}
const GetOneProperty=async(id)=>{ 
  return  await window.canister.PropeonCanister.GetOneProperty(id)
}



export { 
  CreateProperty,
  GetAllProperty,
  GetOneProperty
}



