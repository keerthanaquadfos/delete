const router = require('express').Router();    
const db= require('../model'); 

router.get('/',async(req,res)=>{
    try{    
    const details=await db.Country.findAll().catch((err)=>{
        res.status(404).json({status:false,msg:'Failed to fetch details!',value:err})
    });
    if(details)  
         res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
    else
         res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
     console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
});

router.get('/:id',async(req,res)=>{
    try{   
     const {id} =req.params;  
     const details=await db.Country.findOne({
        where:{
            id:id
        }         
    }).catch((err)=>{
        console.log(err); 
    });

    if(details){
         res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
    }else
         res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
         res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
 });
router.post('/',async(req,res)=>{
    try{
        const {code,name}=req.body; 
        const details=await db.Country.create({code,name});
        if(details)
            res.status(201).json({status:true,msg:'Data saved successfully!',value:details});
        else
            res.status(200).json({status:false,msg:'Failed to save data!',value:null})
    }catch(err){
        console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to save data!',value:err});
    }
 }); 
 router.put('/:id',async(req,res)=>{
    try{ 
        const {id}=req.params;
        const {code,name}=req.body; 
        const details=await db.Country.update({
            code,name
        },{where:{id}});

        if(details)
            res.status(202).json({status:true,msg:'Data updated successfully!',value:details});
        else
            res.status(200).json({status:false,msg:'Failed to update data!',value:null})
    }catch(err){
         res.status(500).json({status:false,msg:'Error occured while tring to update data!',value:err});
    }
 });

 router.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params; 
        const details=await db.Country.destroy({where:{id}});
        if(details){
            res.status(203).json({status:true,msg:'Data deleted successfully!',value:details});
        }else
            res.status(200).json({status:false,msg:'Failed to delete data!',value:null})
    }catch(err){
        console.log(err)
         res.status(500).json({status:false,msg:'Error occured while tring to delete data!',value:err});
    }
 });
module.exports = router;