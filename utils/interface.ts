
import mongoose from "mongoose";

export interface iComment {
  comment?: string;
  userName?: string;
  userAvatar?: string;
  likes?: [];
  post?: {};
}
export interface iAds {
  id: string;
  title: string;
  description?: string;
  // imageUrl?: string;
//   expirationDate: Date;
//   createdAt: Date;
//   updatedAt: Date;
adsURL?:string
  content?: string;
  adsArr?: string[];
}
export interface iAdmin {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
  avatarID?: string;
  articles?: {}[];
  category: [];

  userID: string;
  rate?: number;
  ratings?: [];
  likes?: [];
}

export interface iArticle {
  title?: string;
  description?: string;
  content?: string;
  image?: string;
  imageID?: string;
  userID: string;
 rate?: number;
  ratings?: [];
  likes?: [];
  categoryName?: [];
  user?: {};
  comments?: [];
}
export interface iArticleData extends iArticle , mongoose.Document{}