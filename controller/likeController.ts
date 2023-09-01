import express, { Request, Response } from "express";
import mongoose from "mongoose";
import userModel from "../model/userModel";
import { HTTP } from "../error/mainError";
import { error } from "console";

export const like = async (req: Request, res: Response) => {
  try {
    const { authorID, likeID } = req.params;

    const user: any = await userModel.findById(authorID);
    const liker: any = await userModel.findById(likeID);

    if (!user) {
      console.log(`User with ID ${authorID} not found`);
    }

    if (!liker) {
      console.log(`liker with ID ${likeID} not found`);
    }

    if (user && liker) {
      await user.likes?.push(new mongoose.Types.ObjectId(likeID!));
      await user.save();
      await liker.likes?.push(new mongoose.Types.ObjectId(authorID!));
      await liker.save();

      return res.status(HTTP.CREATED).json({
        message: `${liker.name} you have liked ${user.name} post`,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
          message: "Something went wrong",
          message2: error
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: error.message,
      message1: "Error liking the post",
    });
  }
};


export const unLike = async (req: Request, res: Response) => {
  try {
    const { authorID, likeID } = req.params;

    const author: any = await userModel.findById(authorID);
    const liker: any = await userModel.findById(likeID);

    if (!author) {
      console.log(`Author with ID ${authorID} not found`);
    }

    if (!liker) {
      console.log(`liker with ID ${likeID} not found`);
    }

    if (author && liker) {
      await author.liker?.pull(new mongoose.Types.ObjectId(likeID!));
      await author.save();
      await liker.following?.pull(new mongoose.Types.ObjectId(authorID!));
      await liker.save();

      return res.status(HTTP.CREATED).json({
        message: `${liker.name} you have unliked ${author.name} post`,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Something went wrong",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: error.message,
      message1: "Error liking the post",
    });
  }
};

export const viewLikes = async (req: Request, res: Response) => {
  try {
    const { authorID } = req.params;

    const User: any = await userModel.findById(authorID).populate("likes");

    const friends: any = User.likes;

    return res.status(HTTP.OK).json({
      message: `${User.name} this (is/are) all your likes`,
      data: friends,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error getting your likes",
    });
  }
};
