import Messages from '../models/messagesModel.js'
import Conversation from '../models/conversationModel.js'
export const createMessage = async (req,res,next)=>{
    const newMessages = new Messages({
        conversationId:req.body.conversationId,
        userId:req.userId,
        desc:req.body.desc
    })
    try {
        const savedMessages = await newMessages.save()
        await Conversation.findOneAndUpdate({
            id:req.body.conversationId
        },{
            $set:{
                readBySeller:req.isSeller,
                readByBuyer:!req.isSeller,
                lastMessage:req.body.desc
            }
        },{
            new:true
        })
        res.status(200).send(savedMessages)
    } catch (error) {
        next(error)
    }
}

export const getMessages = async (req,res,next)=>{
    try {
        const messages = await Messages.find({conversationId:req.params.id})
        res.status(200).send(messages)
    } catch (error) {
        next(error)
    }
}