import ErrorHandler from "../middleware/error.js";
import { Task } from "../models/taskModel.js";


export const newTask=(async(req,res)=>{
    try{
    const {title,description}=req.body;

    await Task.create({title,description,user:req.user});
    res.status(201).json({
        success:true,
        message:"new task is created"
    })
    }
    catch(err){
        next(err);
    }
})

export const allTask=(async(req,res)=>{
    try{
    const userid=req.user._id;
    const tasks=await Task.find({user:userid});
    res.status(200).json({
        success:true,
        tasks

    })
   }
   catch(err){
    next(err);
   }

})

export const editTask=(async(req,res,next)=>{
    try{
    const {id}=req.params;
    const task=await Task.findById(id)
    if(!task){
     return next(new ErrorHandler("Task not found",404))
    }
    const {title,description}=req.body;
    await Task.updateOne({_id:id},{$set:{title:title,description:description}})
    //await task.save();
    res.status(200).json({
        success:true,
        message:"Task edited!"
    })}
    catch(err){
        next(err);
    }
})


export const updateTask=(async(req,res,next)=>{
    try{
    const {id}=req.params;
    const task=await Task.findById(id)
    if(!task){
     return next(new ErrorHandler("Task not found",404))
    }
    task.isCompleted=!task.isCompleted;
    await task.save();
    res.status(200).json({
        success:true,
        message:"Task updated!"
    })}
    catch(err){
        next(err);
    }
})

export const deleteTask=(async(req,res,next)=>{
    try{
    const {id}=req.params;
    const task=await Task.findById(id)
    if(!task){
    return  next(new ErrorHandler("Task not found",404))
    }
   await Task.deleteOne({_id:req.params.id})
   res.status(200).json({
    success:true,
    message:"Task deleted"
})
  }
  catch(err){
    next(err);
  }

 
})