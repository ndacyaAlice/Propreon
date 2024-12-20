import React,{ useState } from "react";
import { Button } from "@/components/ui/button"
import { BeatLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import TextInputer from "./Editor";

import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch,useSelector} from "react-redux";
import { useForm } from 'react-hook-form';
import { PropertyValid } from "@/validation/PropertyValid"
import { CreatePropertyThunk } from "@/Redux/action/CreateProperty"



const CreateProperty = () => {
  const [Parking, setParking ] = useState(false)
  const [textedit, setTexteditor] = useState('');
  const dispatch = useDispatch()
  const { 
    register, 
    handleSubmit, 
    setValue, formState: { errors } } = useForm({
    resolver: yupResolver(PropertyValid),
  });

  const ChangeParking=(value)=>{
    setParking(value)
  }
  const handleChange = (value) => {
    setTexteditor(value);
  }

  const submit=(data)=>{
    const {  
      Title,
      Bedroom,
      Bathroom,
      Location,
      PricePerVisit 
    } = data;
    if(textedit) {
      const cleanData= {
        Title,
        Bedroom: Bedroom.toString(),
        Bathroom:Bathroom.toString(),
        Location,
        PricePerVisit:PricePerVisit.toString(),
        Description:textedit,
        Parking: JSON.parse(Parking)
      }
      console.log(cleanData)
      dispatch(CreatePropertyThunk(cleanData))
    }
  }
 const { load,error } = useSelector((state)=>state.CreateProperty)
  return (
    <div className="w-[80%] md:w-[60%] mx-auto">
         <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle>Create Property</CardTitle>
        <CardDescription>Create property to Rent or Visit</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submit)}>
          <div className="grid w-full items-center gap-4">
             <div className="flex flex-col sm:flex-row justify-around ">
             <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Title</Label>
              <Input id="name" type="text" {...register('Title')} placeholder="Title of the property" />
              {errors.Title && <p className="text-red-500">{errors.Title.message}</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">BedRoom</Label>
              <Input id="name" type="number" {...register("Bedroom")} placeholder="Number of beds" />
              {errors.Bedroom && <p className="text-red-500">{errors.Bedroom.message}</p>}
            </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-around ">
             <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Bathroom</Label>
              <Input id="name" type="number" {...register("Bathroom")} placeholder="Bathroom" />
              {errors.Bathroom && <p className="text-red-500">{errors.Bathroom.message}</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Address line</Label>
              <Input id="name" type="text" {...register("Location")} placeholder="Address line" />
              {errors.Location && <p className="text-red-500">{errors.Location.message}</p>}
            </div>
              </div>
              <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="PricePerVisit">PricePerVisit</Label>
              <Input id="name" type="number" {...register("PricePerVisit")} placeholder="Address line" />
              {errors.PricePerVisit && <p className="text-red-500">{errors.PricePerVisit.message}</p>}
              
            </div>
            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="framework">Parking</Label>
              <Select onValueChange={(value)=>{ChangeParking(value)}}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Parking" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value={false}>NO</SelectItem>
                  <SelectItem value={true}>Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* <div className="flex flex-col space-y-1.5">\
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div> */}
    <div className="flex flex-col space-y-1.5 mt-10">
    <TextInputer value={textedit} onChange={handleChange} />
    </div>
          </div>
          <CardFooter className="flex justify-between">
        <Button className="w-[40%] mx-auto text-center z-50">
        {
              load? (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 bg-black -translate-y-1/2">
                  <BeatLoader color="white" loading={load} size={10}/>
                </div>
              ):(
                "Create property"
              )
             }

        </Button>
      </CardFooter>
        </form>
      </CardContent>
     
    </Card>
    
    </div>
  );
}

export default CreateProperty;
















