const express= require ('express')
const router= express.Router();
const mongoose = require ('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post")

router.get("/allPosts",requireLogin,(req,res)=>{
Post.find()
//show id and name of user who wrote post
.populate("postedby",'_id name')
    .then(posts=>{
        res.json(posts)
    }).catch(err=>{
        console.log(err);
})

});
router.post("/createPost",requireLogin,(req,res)=>{
    const {title,body,img}=req.body;
    if(!title||!body||!img){
       return res.status(422).json({error:"Please fill all required fields"})
    }
    //don't need to show in posted by the password of the writer
    req.user.password=undefined
    const post= new Post({
        title,
        body,
        photo:img,
        postedby: req.user
    }) 
    post.save().then(result=>
        {
            res.json ({post:result})
        })
        .catch(err=>{
            console.log(err);
        })
});
router.put("/like",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})
router.put("/unlike",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})
router.get("/myPost",requireLogin,(req,res)=>{
    Post.find()
    .populate("postedby",'_id name')
        .then(mypost=>{
            res.json({mypost})
        }).catch(err=>{
            console.log(err);
    })
});

module.exports=router;