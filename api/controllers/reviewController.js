import Review from "../models/reviewModel.js"
import createError from "../utils/createError.js"
import Gig from '../models/gigModel.js'

export const createReview = async (req,res,next)=>{
    if(req.isSeller) return next(createError(403,'seller cannot create rerviews'))
    const newReview = new Review({
            userId:req.userId,
            gigId:req.body.gigId,
            desc:req.body.desc,
            star:req.body.star
        })
    try {
        const review = await Review.findOne({userId:req.userId,gigId:req.body.gigId})
        if(review) return next(createError(403,'you have already created review for this gig.'))
        const savedReview = await newReview.save()
        await Gig.findByIdAndUpdate(req.body.gigId,{$inc:{totalStars:req.body.star,starNumber:1}})
        res.status(200).send(savedReview)
    } catch (err) {
        next(err)
    }
}
export const getReviews = async (req,res,next)=>{
    try {
        const reviews = await Review.find({gigId:req.params.gigId})
        res.status(201).send(reviews)
    } catch (err) {
        next(err)
    }
}
export const deleteReview = async (req,res,next)=>{
    try {
        const review = await Review.findById(req.params.id)
        if(!review) return next(createError(403,'no review exist'))
        await Review.findByIdAndDelete({gigId:req.params.id})
        res.status(200).json("deleted successfully")
    } catch (err) {
        next(err)
    }
}